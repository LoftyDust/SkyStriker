import { Background } from "../background/Background";

const ctx = canvas.getContext("2d");
let background = [];
let timer = null;
/**
 * 多人游戏类
 */
export class MultiPlayer {
  constructor() {
    background[0] = new Background();
    background[1] = new Background();
    background[1].y = -window.innerHeight;
    background[0].draw(ctx); // 初始化背景
    this.run();
  }
  backgroundAutoRun() {
    for (let i = 0; i<background.length;i++){
      background[i].addY(1);
      background[i].draw(ctx);
      if(background[i].y>=window.innerHeight){
        background[i].y = -window.innerHeight;
      }
    }
  }
  run() {
    ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
    this.backgroundAutoRun();
    timer = requestAnimationFrame(() => {this.run();});
  }
}