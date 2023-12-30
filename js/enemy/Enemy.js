import { ResourceLoader } from "../base/ResourceLoader";
import { Sprite } from "../base/Sprite";

const WIDTH = 60;
const HEIGHT = 60; 
/**
 * 敌对目标类
 */
export class Enemy extends Sprite {
  constructor() {
    let img = ResourceLoader.getInstance().getImage("enemy");
    let randX = Math.floor(Math.random()*(window.innerWidth-WIDTH+1));
    let y = -HEIGHT-20;
    super(img,randX,y,WIDTH,HEIGHT,true);
    this.dx = Math.floor(Math.random()*3)-1; // 初始方向，-1：左，0：下，1：右
    this.lastDirectionChangeTime = 0; // 记录上次方向改变时间
    this.frameIndex = 1; // 记录爆炸动画播放到第几帧 
  }
  /**
   * 每隔随机几秒，更新方向，用于生成随机轨迹
   */
  updateDirection() {
    let now = Date.now();
    if(now-this.lastDirectionChangeTime >= Math.random() * 3000 + 1000) {
      this.dx = Math.floor(Math.random()*3)-1;
      this.lastDirectionChangeTime = now;
    }
    if(this.x+this.dx>window.innerWidth-WIDTH || this.x+this.dx<0 ) {
      this.dx = -this.dx;
    }
    this.addX(this.dx);
  }
  /**
   * 播放爆炸动画
   */
  playExplosion() {
    if (this.frameIndex > 5) {
      this.visible = false;
      this.destroy();
      return;
    }
    this.img = ResourceLoader.getInstance().getImage(`explosion${this.frameIndex}`);
    this.frameIndex++;
    setTimeout(()=>{this.playExplosion()},1000/6);
  }
}