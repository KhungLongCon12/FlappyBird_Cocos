import {
  _decorator,
  Component,
  director,
  Sprite,
  Prefab,
  instantiate,
  Node,
  input,
  Input,
  EventMouse,
  Collider2D,
  Contact2DType,
  IPhysics2DContact,
  Button,
  AudioSource,
} from "cc";
const { ccclass, property } = _decorator;
import { ResultController } from "./ResultController";
import { Bird } from "./Bird";
import { BirdAudio } from "./BirdAudio";

const minY: number = -80; // -74
const maxY: number = 70; //85

@ccclass("MainController")
export class MainController extends Component {
  @property({ type: Bird })
  private bird: Bird;

  @property({ type: BirdAudio })
  private birdAudio: BirdAudio;

  @property({ type: ResultController })
  private result: ResultController;

  @property({ type: Sprite })
  private spBg: Sprite[] = [null, null];

  @property({ type: Sprite })
  private spGround: Sprite[] = [null, null];

  @property({ type: Prefab })
  private pipePrefab: Prefab = null;

  @property({ type: Node })
  private pipeNode: Node = null;

  @property({ type: Button })
  private onVolume: Button = null;

  @property({ type: Button })
  private offVolume: Button = null;

  @property({ type: AudioSource })
  private audio: AudioSource;

  pipe: Node[] = [null, null, null];

  private pipeSpeed: number = 2.0;
  private isOver: boolean = false;
  private _isCreatePipes: boolean = false;

  onLoad() {
    this.initListener();
    this.createPipe();
    this.result.resetScore();
  }

  initListener() {
    input.on(Input.EventType.MOUSE_UP, this.onMouseUp, this);
  }

  onMouseUp(event: EventMouse) {
    if (event.getButton() === 0 || event.getButton() === 2) {
      if (this.isOver != true) {
        this.bird.flying();
        this.birdAudio.onAudioQueue(0);
      } else {
        this.resClickBtn();
      }
    }
  }

  startGame() {
    this.result.hideResults();
    director.resume();
  }

  update(deltaTime: number) {
    //moving Background
    this.movingBackground();

    //moving ground
    this.movingGround();

    // create Pipes when starting
    if (this._isCreatePipes == true) {
      this.movePipe();
    }

    // Check collider
    if (this.isOver === false) {
      this.birdStruck();
    }
  }

  movingBackground() {
    for (let i = 0; i < this.spBg.length; i++) {
      const bgPos = this.spBg[i].node.getPosition();
      bgPos.x -= 1.0;
      if (bgPos.x <= -940) {
        bgPos.x = 940;
      }
      this.spBg[i].node.setPosition(bgPos);
    }
  }

  movingGround() {
    for (let i = 0; i < this.spGround.length; i++) {
      const ground = this.spGround[i].node.getPosition();
      ground.x -= 1.0;
      if (ground.x <= -940) {
        ground.x = 940;
      }
      this.spGround[i].node.setPosition(ground);
    }
  }

  gameOver() {
    this.result.showResults();
    this.isOver = true;
    this.birdAudio.onAudioQueue(3);
    director.pause();
  }

  resetGame() {
    this.result.resetScore();
    this.isOver = false;
    this.startGame();

    this.resetPosAll();
  }

  createPipe() {
    this._isCreatePipes = true;

    for (let i = 0; i < this.pipe.length; i++) {
      this.pipe[i] = instantiate(this.pipePrefab);
      this.pipeNode.addChild(this.pipe[i]);

      var posX = this.pipe[i].position.x;
      var posY = this.pipe[i].position.y;

      posX = 450 + 350 * i;
      posY = minY + Math.random() * (maxY - minY);

      this.pipe[i].setPosition(posX, posY, 0);
    }
  }

  movePipe() {
    for (let i = 0; i < this.pipe.length; i++) {
      var posX = this.pipe[i].position.x;
      var posY = this.pipe[i].position.y;

      posX -= this.pipeSpeed;

      if (posX == 0) {
        this.result.addScore();
        this.birdAudio.onAudioQueue(1);
      }

      if (posX <= -450) {
        posX = 500;
        posY = minY + Math.random() * (maxY - minY);
      }

      this.pipe[i].setPosition(posX, posY, 0);

      this.pipe[i].getChildByName("TopPipe").getComponent(Collider2D).apply();
      this.pipe[i]
        .getChildByName("BottomPipe")
        .getComponent(Collider2D)
        .apply();
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
    this.birdAudio.onAudioQueue(2);
  }

  birdStruck() {
    this.contactGroundPipe();

    if (this.bird.hit == true) {
      this.gameOver();
    }
  }

  resetPosAll() {
    this.bird.resetBird();

    for (let i = 0; i < this.pipe.length; i++) {
      const posX = 400 + 350 * i;
      const posY = minY + Math.random() * (maxY - minY);
      this.pipe[i].setPosition(posX, posY);
    }

    this.movingGround();
    this.movingBackground();
  }

  resClickBtn() {
    this.bird.resetBird();
    this.resetGame();
    this.startGame();
  }

  homeBtn() {
    director.resume();
    director.loadScene("GameMenu");
  }

  onClickVolume(check: boolean) {
    this.offVolume.node.active = true;
    this.onVolume.node.active = false;
    this.audio.volume = 0;
    this.result.checkStat = check;
    console.log("on Click Game play");
  }

  offClickVolume(check: boolean) {
    this.onVolume.node.active = true;
    this.offVolume.node.active = false;
    this.audio.volume = 1;
    this.result.checkStat = check = true;
    console.log("off Click Game play");
  }
}
