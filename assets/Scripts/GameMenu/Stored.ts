import { _decorator, Component, Node } from "cc";
const { ccclass, property } = _decorator;

@ccclass("Stored")
export class Stored extends Component {
  @property({ type: Node })
  private birdColor: Node | null = null;

  @property({ type: Node })
  private statVol: Node | null = null;
}
