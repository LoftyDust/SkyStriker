import { ResourceLoader } from "../base/ResourceLoader";
import { Sprite } from "../base/Sprite";

const WIDTH = window.innerWidth / 3;
const HEIGHT = WIDTH / 3;
/**
 * 按钮类
 */
export class Button extends Sprite {
  constructor() {
    let img = ResourceLoader.getInstance().getImage("button");
    super(img, 0, 0, WIDTH, HEIGHT, true);
    this.touchstartListener = null;
    this.touchmoveListener = null;
    this.touchendListener = null;
    this.touched = false; // 是否被按下
  }
  /**
   * 添加按钮事件响应
   * @param {Function} Func 
   */
  addTouchListener(Func) {
    this.touchstartListener = (e) => { // 开始触摸
      e.preventDefault();
      const touchX = e.touches[0].clientX;
      const touchY = e.touches[0].clientY;
      if (this.checkTouched(touchX, touchY)) {
        this.touched = true;
      }
    };
    this.touchmoveListener = (e) => { // 触摸移动
      e.preventDefault();
      const touchX = e.touches[0].clientX;
      const touchY = e.touches[0].clientY;
      if (this.checkTouched(touchX, touchY)) {
        this.touched = true;
      } else {
        this.touched = false;
      }
    };
    this.touchendListener = (e) => { // 结束触摸
      e.preventDefault();
      if (this.touched) {
        Func();
        this.removeTouchListeners();
      }
    };
    canvas.addEventListener("touchstart", this.touchstartListener);
    canvas.addEventListener("touchmove", this.touchmoveListener);
    canvas.addEventListener("touchend", this.touchendListener);
  }
  /**
   * 判断是否触摸点是否在按钮上
   * @param {number} touchX 
   * @param {number} touchY 
   */
  checkTouched(touchX, touchY) {
    if (touchX >= this.x && touchX <= this.x + this.width && touchY >= this.y && touchY <= this.y + this.height) {
      return true;
    } 
    else {
      return false;
    }
  }
  /**
   * 移除监听事件，使按钮消失后不再触发
   */
  removeTouchListeners() {
    canvas.removeEventListener("touchstart", this.touchstartListener);
    canvas.removeEventListener("touchmove", this.touchmoveListener);
    canvas.removeEventListener("touchend", this.touchendListener);
    this.touchstartListener = null;
    this.touchmoveListener = null;
    this.touchendListener = null;
  }
}