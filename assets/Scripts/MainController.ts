import {
  _decorator,
  Component,
  director,
  Sprite,
  NodeEventType,
  Prefab,
  instantiate,
  Node,
  CCFloat,
  input,
  Input,
  EventMouse,
  Collider2D,
  Contact2DType,
  IPhysics2DContact,
} from "cc";
const { ccclass, property } = _decorator;
import { ResultController } from "./ResultController";
import { Bird } from "./Bird";

const minY: number = -74;
const maxY: number = 85;

@ccclass("MainController")
export class MainController extends Component {
  @property({ type: Bird })
  public bird: Bird;

  @property({ type: ResultController })
  public result: ResultController;

  @property({ type: Sprite })
  private spBg: Sprite[] = [null, null];

  @property({ type: Sprite })
  private spGround: Sprite[] = [null, null];

  @property({ type: Prefab })
  public pipePrefab: Prefab = null;

  @property({ type: Node })
  public pipeNode: Node = null;

  @property({ type: CCFloat, max: 10.0, min: 1.0 })
  public pipeSpeed: number = 5.0;

  pipe: Node[] = [null, null, null];

  private isOver: boolean;
  private _isCreatePipes: boolean = false;

  onLoad() {
    console.log("MainController is running");
    this.initListener();
    this.createPipe();
    this.movePipe();
    this.result.resetScore();
    this.isOver = true;
  }

  initListener() {
    input.on(Input.EventType.MOUSE_UP, this.onMouseUp, this);
  }

  onMouseUp(event: EventMouse) {
    if (this.isOver == true) {
      this.resetGame();
      this.bird.resetBird();
      this.startGame();
    } else if (this.isOver == false) {
      if (event.getButton() === 0 || event.getButton() === 2) {
        this.bird.flying();
      }
    }
  }

  startGame() {
    this.result.hideResults();
    director.resume();
  }

  update(deltaTime: number) {
    //moving Background
    for (let i = 0; i < this.spBg.length; i++) {
      const bgPos = this.spBg[i].node.getPosition();
      bgPos.x -= 1.0;
      if (bgPos.x <= -940) {
        bgPos.x = 940;
      }
      this.spBg[i].node.setPosition(bgPos);
    }

    //moving ground
    for (let i = 0; i < this.spGround.length; i++) {
      const ground = this.spGround[i].node.getPosition();
      ground.x -= 1.0;
      if (ground.x <= -940) {
        ground.x = 940;
      }
      this.spGround[i].node.setPosition(ground);
    }

    // create Pipes when starting
    if (this._isCreatePipes == true) {
      this.movePipe();
    }

    // Check collider
    if (this.isOver === false) {
      this.birdStruck();
    }
  }

  gameOver() {
    this.result.showResults();
    this.isOver = true;
    director.pause();
  }

  resetGame() {
    this.result.resetScore();
    this.isOver = false;
    this.startGame();

    this.resetPosAll();
  }

  createPipe() {
    console.log("create Pipes");
    this._isCreatePipes = true;

    for (let i = 0; i < this.pipe.length; i++) {
      this.pipe[i] = instantiate(this.pipePrefab);
      this.pipeNode.addChild(this.pipe[i]);

      var posX = this.pipe[i].position.x;
      var posY = this.pipe[i].position.y;

      posX = 400 + 350 * i;
      posY = minY + Math.random() * (maxY - minY);

      this.pipe[i].setPosition(posX, posY);
    }
  }

  movePipe() {
    for (let i = 0; i < this.pipe.length; i++) {
      var posX = this.pipe[i].position.x;
      var posY = this.pipe[i].position.y;

      posX -= this.pipeSpeed;
      const posBirdX = this.bird.node.position.x;
      if (posX == posBirdX) {
        this.result.addScore();
      }

      if (posX <= -550) {
        posX = 600;
        posY = minY + Math.random() * (maxY - minY);
      }

      this.pipe[i].setPosition(posX, posY, 0);
    }
  }

  contactGroundPipe() {
    let collider = this.bird.getComponent(Collider2D);

    if (collider) {
      collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
    }
  }

  onBeginContact(
    selfCollider: Collider2D,
    otherCollider: Collider2D,
    contact: IPhysics2DContact | null
  ) {
    this.bird.hit = true;
  }

  birdStruck() {
    this.contactGroundPipe();

    if (this.bird.hit == true) {
      this.gameOver();
      this.result.node.getChildByName("GameButton").active = true;
    }
  }

  resetPosAll() {
    this.bird.resetBird();

    for (let i = 0; i < this.pipe.length; i++) {
      const posX = 400 + 350 * i;
      const posY = minY + Math.random() * (maxY - minY);
      this.pipe[i].setPosition(posX, posY);
    }
  }
}
