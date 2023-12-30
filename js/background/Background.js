import { ResourceLoader } from "../base/ResourceLoader";
import { Sprite } from "../base/Sprite";

/**
 * 背景类
 */
export class Background extends Sprite {
  constructor() {
    let img = ResourceLoader.getInstance().getImage("background");
    super(img, 0, 0, window.innerWidth, window.innerHeight, true);
  }
}