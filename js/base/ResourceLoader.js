const IMAGE_PATH = "./images/";
const IMAGES = [
  ["background", `${IMAGE_PATH}bg.jpg`],
  ["enemy", `${IMAGE_PATH}enemy.png`],
  ["button",`${IMAGE_PATH}button.png`],
  ["bullet",`${IMAGE_PATH}bullet.png`]
];
let instance;
/**
 * 资源加载器
 */
export class ResourceLoader {
  constructor() {
    // 加载爆炸图片
    for (let i = 1; i <= 5; i++) {
      IMAGES.push([`explosion${i}`,`${IMAGE_PATH}explosion${i}.png`])
    }
    // 加载玩家图片
    for (let i = 1; i <= 8; i++) {
      IMAGES.push([`player${i}`,`${IMAGE_PATH}player${i}.png`])
    }
    this.imageMap = new Map(IMAGES);
    for (let [key, value] of this.imageMap) {
      let img = new Image();
      img.src = value;
      this.imageMap.set(key, img);
    }
  }
  /**
   * 根据key值获取图片资源
   * @param {*} key 
   */
  getImage(key){
    return this.imageMap.get(key);
  }
  /**
   * 加载全部图片资源
   * @param {Function} callback 
   */
  onLoad(callback) {
    let loadCount = 0;
    for (let img of this.imageMap.values()) {
      img.onload = () => {
        loadCount++;
        if (loadCount == this.imageMap.size){
          callback();
        }
      }
    }
  }
  /**
   * 单例模式获取资源加载器对象
   */
  static getInstance() {
    if (!instance) {
      instance = new ResourceLoader();
    }
    return instance;
  }
}