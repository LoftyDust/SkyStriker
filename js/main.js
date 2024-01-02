import { Button } from "./button/Button";
import { ResourceLoader } from "./base/ResourceLoader";
import { Sound } from "./base/Sound";
import { SinglePlayer } from "./gameMode/SinglePlayer";
import { MultiPlayer } from "./gameMode/MultiPlayer";
import { Sprite } from "./base/Sprite";
import { Background } from "./background/Background";

const ctx = canvas.getContext("2d");
let instance = null;
/**
 * 主类 程序入口处
 */
export class Main {
  constructor() {
    console.log("2");
    this.singlePlayerButton = null;
    this.multiPlayerButton = null;
    let rl = ResourceLoader.getInstance();
    rl.onLoad(()=>{this.init()});
  }
  static getInstance() {
    if (!instance) {
      instance = new Main();
    }
    return instance;
  }
  init() {
    Sound.getInstance().playBgmAudio(); // 初始化游戏背景音乐
    let singlePlayer = null;
    let multiPlayer = null;
    let img = ResourceLoader.getInstance().getImage("single");
    this.singlePlayerButton = new Button(img);
    img = ResourceLoader.getInstance().getImage("multi");
    this.multiPlayerButton = new Button(img);
    let background = new Background();
    img = ResourceLoader.getInstance().getImage("cover");
    let bg = new Sprite(img, 0, window.innerHeight-img.height/img.width*window.innerWidth, window.innerWidth, img.height/img.width*window.innerWidth, true);
    background.draw(ctx);
    bg.draw(ctx);
    this.singlePlayerButton.x = window.innerWidth / 2 - this.singlePlayerButton.width / 2;
    this.singlePlayerButton.y = window.innerHeight * 2 / 3;
    this.singlePlayerButton.draw(ctx);
    this.singlePlayerButton.addTouchListener(this.multiPlayerButton,()=>{
      singlePlayer = new SinglePlayer();
    });
    this.multiPlayerButton.x = window.innerWidth / 2 - this.multiPlayerButton.width / 2;
    this.multiPlayerButton.y = window.innerHeight * 5 / 6;
    this.multiPlayerButton.draw(ctx);
    this.multiPlayerButton.addTouchListener(this.singlePlayerButton,()=>{
      console.log("准备创建MultiPlayer")
      multiPlayer = new MultiPlayer();
    });
  }
}