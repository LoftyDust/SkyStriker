import { ResourceLoader } from "../base/ResourceLoader";
import { Sprite } from "../base/Sprite";

const WIDTH = 100;
const HEIGHT = 110;
/**
 * 玩家类
 */
export class Player extends Sprite {
  constructor() {
    let img = ResourceLoader.getInstance().getImage("player1");
    let x = window.innerWidth / 2 - WIDTH / 2;
    let y = window.innerHeight - 150;
    super(img, x, y, WIDTH, HEIGHT, true);
    this.touched = false;
    this.frameIndex = 1;
    this.playAnimation();
  }
  /**
   * 添加手指触摸响应
   */
  addTouchListener() {
    canvas.addEventListener("touchstart", (e) => { //触摸开始
      e.preventDefault();
      const touchX = e.touches[0].clientX;
      const touchY = e.touches[0].clientY;
      if (this.checkTouched(touchX,touchY)) {
        this.touched = true;
        this.setPlayerTo(touchX,touchY);
      }
    });
    canvas.addEventListener("touchmove", (e) => { //触摸移动
      e.preventDefault();
      const touchX = e.touches[0].clientX;
      const touchY = e.touches[0].clientY;
      if (this.touched) {
        this.setPlayerTo(touchX,touchY);
      } 
    });
    canvas.addEventListener("touchend", (e) => { //触摸结束
      e.preventDefault();
      this.touched = false;
    });
  }
  /**
   * 判断是否触摸到player上
   * @param {*} touchX 
   * @param {*} touchY 
   * @returns {boolean}
   */
  checkTouched(touchX,touchY) {
    if(touchX >= this.x && touchX <= this.x + this.width
      && touchY >= this.y && touchY <= this.y + this.height) {
        return true;
      }
    else {
      return false;
    }
  }
  /**
   * 将player移动到坐标
   * @param {*} touchX 
   * @param {*} touchY 
   */
  setPlayerTo(touchX,touchY){
    let dx = touchX - this.width/2;
    let dy = touchY - this.height/2;
    if(dx < 0){
      dx = 0;
    }
    else if (dx > window.innerWidth - this.width) {
      dx = window.innerWidth - this.width;
    }
    if (dy < 0) {
      dy = 0; 
    }
    else if (dy > window.innerHeight - this.height) {
      dy = window.innerHeight - this.height;
    }
    this.x = dx;
    this.y = dy;
  }
  /**
   * 播放玩家动画
   */
  playAnimation() {
    if (this.frameIndex > 8)  {
      this.frameIndex = 1;
    }
    this.img = ResourceLoader.getInstance().getImage(`player${this.frameIndex}`);
    this.frameIndex++;
    setTimeout(()=>{this.playAnimation()},1000/6);
  }
}