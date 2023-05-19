import {
  _decorator,
  Animation,
  AudioSource,
  Button,
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
  private MoveNode: Node = null;

  @property({ type: Node })
  private AudioNode: Node = null;

  @property({ type: Node })
  private birdAnim: Node | null = null;

  private check: boolean = true; // set for onVolume

  protected onLoad(): void {
    director.resume();
  }

  start() {
    let bird = this.birdAnim.getComponent(Animation);
    bird.playOnLoad = true;

    this.onVolume.node.active = true;
    this.offVolume.node.active = false;

    if (this.onVolume.node.active == true) {
      this.audio.play();
      console.log("true");
    } else {
      console.log("false");
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
    console.log("start Btn");

    let volume = this.AudioNode.getComponent(AudioSource).volume; // check volume
    volume = 0;
    if (volume === 1) {
      console.log("true");
    } else console.log("false");
    director.loadScene("game");
    //this.menuAudio.onAudioQueue(1);
    director.addPersistRootNode(this.MoveNode);
  }

  onClickVolume() {
    this.offVolume.node.active = true;
    this.onVolume.node.active = false;
    // this.menuAudio.muteVolume();
    this.audio.volume = 0;
    //this.menuAudio.onAudioQueue(0);
    // this.audio.pause();
    console.log("stop");
  }

  offClickVolume() {
    this.onVolume.node.active = true;
    this.offVolume.node.active = false;
    this.audio.volume = 1;
    // this.audio.play();
    console.log("play");
    //this.offVolume.node.active = true;
  }
}
