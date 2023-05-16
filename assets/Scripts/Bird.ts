import {
  __private,
  _decorator,
  Animation,
  CCFloat,
  Component,
  RigidBody2D,
  Sprite,
  tween,
  Vec3,
} from "cc";
const { ccclass, property, requireComponent } = _decorator;

@ccclass("Bird")
@requireComponent(Sprite)
export class Bird extends Component {
  @property({
    type: CCFloat,
  })
  private jumpHeight: number = 100;

  @property({
    type: CCFloat,
  })
  private jumpDuration: number = 0.5;

  public hit: boolean;

  private birdAnima: Animation;
  public _birdLocation: Vec3;

  onLoad() {
    this.resetBird();

    this.birdAnima = this.getComponent(Animation);
  }

  resetBird() {
    this._birdLocation = new Vec3(0, 0, 0);
    this.node.setPosition(this._birdLocation);
    this.hit = false;
  }

  flying() {
    this.birdAnima.stop();

    const targetY = this.node.position.y + this.jumpHeight;

    const birdRotateUp = () => {
      const rotationDuration = this.jumpDuration * 0.4;
      tween(this.node)
        .to(rotationDuration, { eulerAngles: new Vec3(0, 0, 45) })
        .call(birdRotateDown)
        .start();
    };

    const birdRotateDown = () => {
      const rotationDuration = this.jumpDuration * 0.6;
      tween(this.node)
        .to(rotationDuration, { eulerAngles: new Vec3(0, 0, -30) })
        .start();
    };

    tween(this.node.position)
      .to(
        this.jumpDuration,
        new Vec3(
          this.node.position.x,
          this.node.position.y + this.jumpHeight,
          0
        ),
        {
          easing: "smooth",
          onUpdate: (target: Vec3, ratio: number) => {
            this.node.position = target;
          },
        }
      )
      .call(() => {
        if (this.hit) {
          birdRotateDown();
        }
      })
      .start();

    birdRotateUp();

    this.birdAnima.play();
  }
}
