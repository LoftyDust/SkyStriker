import { Background } from "./background/Background";
import { Button } from "./button/Button";
import { ResourceLoader } from "./base/ResourceLoader";
import { Sound } from "./base/Sound";
import { SinglePlayer } from "./gameMode/SinglePlayer";
import { MultiPlayer } from "./gameMode/MultiPlayer";

const ctx = canvas.getContext("2d");
let singlePlayerButton = new Button();
let multiPlayerButton = new Button();
/**
 * 主类 程序入口处
 */
export class Main {
  constructor() {
    let rl = ResourceLoader.getInstance();
    rl.onLoad(()=>{this.init()});
  }
  init() {
    Sound.getInstance().playBgmAudio(); // 初始化游戏背景音乐
    let bg = new Background();
    bg.draw(ctx);
    singlePlayerButton.x = window.innerWidth / 2 - singlePlayerButton.width / 2;
    singlePlayerButton.y = window.innerHeight * 2 / 3;
    singlePlayerButton.draw(ctx);
    singlePlayerButton.addTouchListener(()=>{new SinglePlayer();});
    multiPlayerButton.x = window.innerWidth / 2 - multiPlayerButton.width / 2;
    multiPlayerButton.y = window.innerHeight * 5 / 6;
    multiPlayerButton.draw(ctx);
    multiPlayerButton.addTouchListener(()=>{new MultiPlayer();});
  }
}