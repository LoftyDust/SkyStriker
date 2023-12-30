/**
 * 游戏精灵类
 */
export class Sprite {
  constructor(img = null, x = 0, y = 0, width = 0, height = 0, visible = true) {
    this.img = img;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.visible = visible;
    this.isCollision = true; //是否参加碰撞
  }
  /**
   * 将精灵对象绘制在画布上
   * @param {RenderingContext} ctx 
   */
  draw(ctx) {
    if (this.visible) {
      ctx.drawImage(this.img, 0, 0, this.img.width, this.img.height, this.x, this.y, this.width, this.height);
    }
  }
  /**
   * x坐标增加一个数值
   * @param {*} value 
   */
  addX(value) {
    this.x += value;
  }
  /**
   * y坐标增加一个数值
   * @param {*} value 
   */
  addY(value) {
    this.y += value;
  }
  /**
   * 将精灵移动到(x,y)坐标点
   * @param {*} x 
   * @param {*} y 
   */
  moveTo(x, y) {
    this.x = x;
    this.y = y;
  }
  /**
   * 销毁当前对象
   */
  destroy(){
    this.img = null;
  }
  /**
   * 碰撞检测
   * @param {Sprite} target 
   */
  collisionDetection(target) {
    if (!this.isCollision || !target.isCollision) {
      return false;
    }
    let t_left = target.x;
    let t_right = target.x + target.width;
    let t_top = target.y;
    let t_bottom = target.y + target.height;
    // 左上角
    if (this.x >= t_left && this.x <= t_right 
      && this.y >= t_top && this.y <= t_bottom) {
        return true;
      }
    // 右上角
    if (this.x + this.width >= t_left && this.x + this.width <= t_right
      && this.y >= t_top && this.y <= t_bottom) {
        return true;
      }
    // 左下角
    if (this.x >= t_left && this.x <= t_right
      && this.y + this.height >= t_top && this.y + this.height <= t_bottom) {
        return true;
      }
    // 右下角
    if (this.x + this.width >= t_left && this.x + this.width <= t_right
      && this.y + this.height >= t_top && this.y + this.height <= t_bottom) {
        return true;
      }
    return false;
  }
}