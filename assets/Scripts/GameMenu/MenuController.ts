import {
  _decorator,
  Animation,
  AudioSource,
  Button,
  color,
  Component,
  director,
  Node,
  Sprite,
} from "cc";
import { GameAudio } from "./GameAudio";
const { ccclass, property } = _decorator;

@ccclass("MenuController")
export class MenuController extends Component {
  @property({ type: Button })
  private onVolume: Button | null = null;

  @property({ type: Button })
  private offVolume: Button | null = null;

  @property({ type: GameAudio })
  private menuAudio: GameAudio;

  @property({ type: AudioSource })
  private audio: AudioSource;

  @property({ type: Sprite })
  private spBg: Sprite[] = [null, null];

  @property({ type: Node })
  private AudioNode: Node = null;

  @property({ type: Node })
  private bird: Node | null = null;

  start() {
    let bird = this.bird.getComponent(Animation);
    bird.playOnLoad = true;

    this.onVolume.node.active = true;
    this.offVolume.node.active = false;

    if (this.onVolume.node.active == true) {
      this.audio.play();
    }
  }

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
    let volume = this.AudioNode.getComponent(AudioSource).volume; // stored volume to compare

    director.loadScene("GamePlay");
    this.menuAudio.onAudioQueue(1);
    //director.addPersistRootNode(this.MoveNode);
  }

  onClickVolume() {
    this.offVolume.node.active = true;
    this.onVolume.node.active = false;

    this.audio.volume = 0;
  }

  offClickVolume() {
    this.onVolume.node.active = true;
    this.offVolume.node.active = false;

    this.audio.volume = 1;
  }

  handleChangeColor() {
    const randColor = color(
      Math.random() * 255,
      Math.random() * 255,
      Math.random() * 255
    );

    let birdColor = this.bird.getComponent(Sprite);
    birdColor.color = randColor;
  }
}
