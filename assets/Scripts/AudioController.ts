import { _decorator, AudioSource, Component, Node } from "cc";
const { ccclass, property } = _decorator;

@ccclass("AudioController")
export class AudioController extends Component {
  @property(AudioSource)
  public _audioSource: AudioSource = null!;

  @property({ type: Node })
  private onVolume: Node;

  @property({ type: Node })
  private offVolume: Node;

  onLoad() {
    // Get the AudioSource component
    const audioSource = this.node.getComponent(AudioSource)!;
    // Check if it contains AudioSource, if not, output an error message
    // Assign the component to the global variable _audioSource
    this._audioSource = audioSource;
  }

  play() {
    // Play the music
    this._audioSource.play();
    this.onVolume.active = true;
    this.offVolume.active = false;
  }

  pause() {
    // Pause the music
    this._audioSource.pause();
    this.onVolume.active = false;
    this.offVolume.active = true;
  }
}
