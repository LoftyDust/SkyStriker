import { ResourceLoader } from "../base/ResourceLoader";
import { Button } from "../button/Button";
import { Main } from "../main";

const P_WIDTH = 400;
const P_HEIGHT = 320;
const P_X = (window.innerWidth - P_WIDTH) / 2;
const P_Y = (window.innerHeight - P_HEIGHT) / 2;
/**
 * 消息弹框类
 */
export class MessageBox {
  constructor() {
    this.img = ResourceLoader.getInstance().getImage("pannel");
    this.visible = true;
  }
/**
 * 显示提示框
 * @param {RenderingContext} ctx 
 */
  show(ctx) {
    ctx.drawImage(this.img,0,0,this.img.width,this.img.height,P_X,P_Y,P_WIDTH,P_HEIGHT);
    ctx.fillStyle = "#f28888";
    ctx.font = "24px Arial"
    ctx.fillText("游戏结束!",P_X+P_WIDTH/2-48,P_Y+80);
    ctx.font = "38px Arial"
    ctx.fillText("未能及时击败目标!",P_X+P_WIDTH/2-152,P_Y+P_HEIGHT/2);
    let img = ResourceLoader.getInstance().getImage("back");
    let backButton = new Button(img);
    backButton.x = P_X+P_WIDTH/2-backButton.width/2;
    backButton.y = P_Y+P_HEIGHT-110;
    backButton.addTouchListener(backButton,() => {
      Main.getInstance().init();
    });
    backButton.draw(ctx);
  }
  drawWaitingMessage(ctx) {
    if(this.visible) {
      ctx.drawImage(this.img,0,0,this.img.width,this.img.height,P_X,P_Y,P_WIDTH,P_HEIGHT);
      ctx.fillStyle = "#f28888";
      ctx.font = "24px Arial"
      ctx.fillText("等待其他玩家加入游戏……",P_X+P_WIDTH/2-132,P_Y+P_HEIGHT/2);
    }
  }
}