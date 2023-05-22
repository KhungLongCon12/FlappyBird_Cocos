import { _decorator, Button, Component, Label } from "cc";
const { ccclass, property } = _decorator;

@ccclass("ResultController")
export class ResultController extends Component {
  @property({ type: Label })
  private scoreLabel: Label;

  @property({ type: Label })
  private highScore: Label;

  @property({ type: Button })
  private offVolBtn: Button;

  private _maxScore: number = 0;
  private _currentScore: number = 0;
  private _checkStat: boolean = true; // onVolume auto on

  get checkStat() {
    return this._checkStat;
  }

  set checkStat(value: boolean) {
    this._checkStat = value;
  }

  updateScore(score: number) {
    this._currentScore = score;
    this.scoreLabel.string = ` ${this._currentScore}`;
  }

  resetScore() {
    this.updateScore(0);
    this.hideResults();
  }

  addScore() {
    this.updateScore(this._currentScore + 1);
  }

  showResults() {
    this._maxScore = Math.max(this._maxScore, this._currentScore);
    this.highScore.string = `High Score  ${this._maxScore}`;

    this.node.active = true;
    const onStats = this.node.getChildByName("OnVolume");

    if (this._checkStat === true) {
      onStats.active = true;
      console.log("_checkStat true");
    } else {
      this.offVolBtn.node.active = true;
      console.log("_checkStat false");
    }
  }

  hideResults() {
    this.node.active = false;
    this.offVolBtn.node.active = false;
  }
}
