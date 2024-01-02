import { Background } from "../background/Background";
import { Bullets } from "../player/Bullets";
import { Enemy } from "../enemy/Enemy";
import { Player } from "../player/Player";
import { Sound } from "../base/Sound";
import { MessageBox } from "../background/MessageBox";

const ctx = canvas.getContext("2d");
let background = [];
let bullets = [];
let bulletTimer = null;
let enemyTimer = null;
let enemyNum = 0; // 在场enemy数量
let enemies = []; // 敌对目标
let player = null; // 玩家
let timer = null;
/**
 * 单人游戏类
 */
export class SinglePlayer {
  constructor() {
    background = [];
    bullets = [];
    bulletTimer = null;
    enemyTimer = null;
    enemyNum = 0; // 在场enemy数量
    enemies = []; // 敌对目标
    player = null; // 玩家
    timer = null;
    background[0] = new Background();
    background[1] = new Background();
    background[1].y = -window.innerHeight;
    background[0].draw(ctx); // 初始化背景
    enemyTimer=setInterval(()=>{this.createEnemy();},1000); // 初始化敌对目标
    bulletTimer=setInterval(() => {this.shot();},800); // 初始化子弹
    player = new Player(); // 初始化玩家飞机
    player.addTouchListener();
    this.isGameOver = false;
    this.run();
  }
  /**
   * 背景滚动
   */
  backgroundAutoRun() {
    for (let i = 0; i<background.length;i++){
      background[i].addY(1);
      background[i].draw(ctx);
      if(background[i].y>=window.innerHeight){
        background[i].y = -window.innerHeight;
      }
    }
  }
  /**
   * 生成敌对目标，存入数组
   */
  createEnemy() {
    while(enemyNum < 2){
      enemies.push(new Enemy());
      enemyNum ++;
    }
  }
  /**
   * 敌对目标自动运动，超过下边界自动回收
   */
  enemyMove() {
    let index =  []; // 飞出屏幕下边界的目标索引
    for(let i = 0; i<enemies.length;i++){
      enemies[i].draw(ctx);
      enemies[i].addY(1);
      enemies[i].updateDirection(); // 随机轨迹
      if(enemies[i].y > window.innerHeight){
        index.push(i);
        if (enemies[i].isCollision) {
          this.isGameOver = true;
        }
      }
    }
    // 从数组中删除已销毁的敌机
    for (let i = index.length - 1; i >= 0; i--) {
        enemies[i].destroy();
        enemies.splice(i,1);
    }
  }
  /**
   * 生成子弹对象
   */
  shot() {
    Sound.getInstance().playBulletAudio(); // 播放子弹音效
    bullets.push(new Bullets(player.x+player.width/2,player.y));
  }
  /**
   * 子弹自动向上移动，超过上边界回收
   */
  bulletMove() {
    let index =  []; 
    for(let i = 0; i < bullets.length; i++){
      bullets[i].draw(ctx);
      bullets[i].addY(-4);
      if(bullets[i].y < 0){
        index.push(i);
      }
      for (let j = 0; j < enemies.length; j++) {
        if (bullets[i].collisionDetection(enemies[j])) {
          enemies[j].blood --;
          bullets[i].visible = false;
          bullets[i].isCollision = false;
          if(enemies[j].blood == 0) {
            Sound.getInstance().playBoomAudio();
            enemies[j].isCollision = false;
            enemies[j].playExplosion();  
            enemyNum --;
          }      
        }
      }
    }
    for (let i = index.length - 1; i >= 0; i--) {
      bullets[i].destroy();
      bullets.splice(i,1);
    }
  }
  /**
   * 帧动画
   */
  run() {
    if (this.isGameOver) {
      cancelAnimationFrame(timer);
      clearInterval(enemyTimer);
      clearInterval(bulletTimer);
      new MessageBox().show(ctx);
      return;
    }
    ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
    this.backgroundAutoRun();
    this.enemyMove();
    player.draw(ctx);
    this.bulletMove();
    timer = requestAnimationFrame(() => {this.run();});
  }
}