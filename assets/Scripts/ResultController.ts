import { _decorator, Button, Component, Label, Node } from "cc";
const { ccclass, property } = _decorator;

@ccclass("ResultController")
export class ResultController extends Component {
  @property({ type: Label })
  public scoreLabel: Label;

  @property({ type: Label })
  public highScore: Label;

  @property({ type: Button })
  public restartBtn: Button;

  public _maxScore: number = 0;
  public _currentScore: number = 0;

  start() {}

  updateScore(score: number) {
    this._currentScore = score;
    this.scoreLabel.string = "" + this._currentScore;
  }

  resetScore() {
    this._currentScore = 0;
    this.updateScore(0);
    this.hideResults();
  }

  addScore() {
    this.updateScore(this._currentScore + 1);
  }

  showResults() {
    this._maxScore = Math.max(this._maxScore, this._currentScore);
    this.highScore.string = "High Score" + this._maxScore;
    this.restartBtn.node.active = true;
    this.highScore.node.active = true;
  }

  hideResults() {
    this.highScore.node.active = false;
    this.restartBtn.node.active = false;
  }
}
