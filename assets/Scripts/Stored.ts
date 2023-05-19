import { _decorator, Component } from "cc";
const { ccclass, property } = _decorator;

@ccclass("Stored")
export class Stored extends Component {
  private volume: number;
}
