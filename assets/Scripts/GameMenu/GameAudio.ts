import { _decorator, AudioClip, AudioSource, Button, Component } from "cc";
const { ccclass, property } = _decorator;

@ccclass("GameAudio")
export class GameAudio extends Component {
  @property({ type: [AudioClip] })
  private clips: AudioClip[] = [];

  @property(AudioSource)
  private audioSourceMenu: AudioSource;

  private onVolBtn: Button = null;
  private offVolBtn: Button = null;
  private isMute: boolean = false;

  onAudioQueue(index: number) {
    let clip: AudioClip = this.clips[index];
    this.audioSourceMenu.playOneShot(clip);
  }

  muteVolume() {
    this.audioSourceMenu.volume = 0;
    this.audioSourceMenu.stop();
  }
}
