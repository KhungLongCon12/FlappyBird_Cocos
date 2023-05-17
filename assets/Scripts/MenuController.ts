import { _decorator, Button, Component, director, Node, Sprite } from "cc";
const { ccclass, property } = _decorator;

@ccclass("MenuController")
export class MenuController extends Component {
  @property({ type: Node })
  private volume: Node | null = null;

  @property({ type: Sprite })
  private spBg: Sprite[] = [null, null];

  private check: boolean = true; // set for onVolume

  onload() {}

  update(dt: number) {
    for (let i = 0; i < this.spBg.length; i++) {
      const bgPos = this.spBg[i].node.getPosition();
      bgPos.x -= 2.0;
      if (bgPos.x <= -940) {
        bgPos.x = 940;
      }
      this.spBg[i].node.setPosition(bgPos);
    }
  }

  startClickBtn() {
    console.log("start Btn");
    director.loadScene("game");
  }

  handleVolumeOn() {}
  handleVolumeOff() {}
}
