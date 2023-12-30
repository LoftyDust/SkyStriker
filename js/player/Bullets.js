import { ResourceLoader } from "../base/ResourceLoader";
import { Sprite } from "../base/Sprite";

const WIDTH = 30;
const HEIGHT = 60;
/**
 * 子弹类
 */
export class Bullets extends Sprite {
  /**
   * 
   * @param {number} x player中心x坐标 
   * @param {number} y player y坐标
   */
  constructor(x,y) {
    let img = ResourceLoader.getInstance().getImage("bullet");
    super(img, x-WIDTH/2,y-HEIGHT,WIDTH, HEIGHT, true);
  }
}