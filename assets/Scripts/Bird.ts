import {
  __private,
  _decorator,
  Animation,
  CCFloat,
  Component,
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
    max: 100.0,
    min: 1.0,
    slide: true,
  })
  public birdSpeed: number = 5.0;

  @property({
    type: CCFloat,
  })
  public jumpHeight: number = 100;

  @property({
    type: CCFloat,
  })
  public jumpDuration: number = 0.5;

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
    console.log(this._birdLocation);
    this.hit = false;
  }

  flying() {
    this.birdAnima.stop();

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
      .start();

    this.birdAnima.play();
  }
}
