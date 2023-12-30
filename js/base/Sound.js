let instance;
/**
 * 音频类
 */
export class Sound {
  constructor() {
    this.bgmAudio = new Audio("./audio/bgm.mp3");
    this.boomAudio = new Audio("./audio/boom.mp3");
    this.bulletAudio = new Audio("./audio/bullet.mp3");
  }
  static getInstance() {
    if(!instance) {
      instance = new Sound();
    }
    return instance;
  }
  playBulletAudio() {
    this.bulletAudio.currentTime = 0;
    this.bulletAudio.play();
  }
  playBgmAudio() {
    this.bgmAudio.currentTime = 0;
    this.bgmAudio.loop = true;
    this.bgmAudio.play();
  }
  playBoomAudio() {
    this.boomAudio.currentTime = 0;
    this.boomAudio.play();
  }
}