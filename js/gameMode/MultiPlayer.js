import { Background } from "../background/Background";
import { MessageBox } from "../background/MessageBox";
import { Sound } from "../base/Sound";
import { Enemy } from "../enemy/Enemy";
import { Bullets } from "../player/Bullets";
import { Partner } from "../player/Partner";
import { Player } from "../player/Player";
const ctx = canvas.getContext("2d");
const io = require("../libs/weapp.socket.io.wx");
let background = [];
let bullets = [];
let bulletTimer = null;
let timer = null;
let player = null;
let partner = null;
let enemies = [null,null,null];
let waitingPanel;

/**
 * 多人游戏类
 */
export class MultiPlayer {
  constructor() {
    background = [];
    bullets = [];
    bulletTimer = null;
    timer = null;
    player = null;
    partner = null;
    enemies = [null,null,null];
    this.isGameOver = false;
    this.socket = io('http://localhost:3000'); 
    background[0] = new Background();
    background[1] = new Background();
    background[1].y = -window.innerHeight;
    background[0].draw(ctx); // 初始化背景
    player = new Player();
    console.log("MultiPlayer已创建");
    this.socket.emit('join-room', (roomID) => {
      // 在回调函数中获取房间ID并进行后续操作
      console.log(roomID);
    });
    waitingPanel = new MessageBox();
    this.socket.on('game-start',()=>{
      console.log("开始游戏")
      waitingPanel.visible = false;
      partner = new Partner();
      bulletTimer=setInterval(() => {this.shot();},800); // 初始化子弹
    });
    player.addTouchListener(() => {
      this.socket.emit('player-move', { id: this.socket.id, x: player.x, y: player.y});
    });
    this.socket.on('opponent-move', (position) => {
      // 根据接收到的位置信息更新对手在玩家屏幕上的位置
      if(this.socket.id != position.id && partner) {
        partner.moveTo(position.x,position.y);
      }
    });
    this.run();
  }
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
   * 生成子弹对象
   */
  shot() {
    Sound.getInstance().playBulletAudio(); // 播放子弹音效
    Sound.getInstance().playBulletAudio(); // 播放子弹音效
    bullets.push(new Bullets(player.x+player.width/2,player.y));
    bullets.push(new Bullets(partner.x+partner.width/2,partner.y));
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
            this.socket.emit("enemy-destroyed",j);  
          }      
        }
      }
    }
    for (let i = index.length - 1; i >= 0; i--) {
      bullets[i].destroy();
      bullets.splice(i,1);
    }
  }
  run() {
    this.socket.once('gameover',(flag) => {
      console.log("gameover");
      this.isGameOver = true;
      return;
    });
    if(this.isGameOver) {
      cancelAnimationFrame(timer);
      clearInterval(bulletTimer);
      new MessageBox().show(ctx);
      this.socket.removeAllListeners();
      this.socket.disconnect();
      this.socket = null;
      return;
    }
    ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
    this.backgroundAutoRun();
    
    this.bulletMove();
    this.socket.on('enemy-added', (data) => {
      enemies[data.id] = new Enemy(data);
    });
    this.socket.on('enemy-update', (data) => {
      enemies[data.id].moveTo(data.x,data.y);
    });
    for(let i = 0; i < 3; i++) {
      if(enemies[i]) {
        //console.log(enemies[i]);
        enemies[i].draw(ctx);
      }
    }
    player.draw(ctx);
    if(partner) {
      partner.draw(ctx);
    }
    waitingPanel.drawWaitingMessage(ctx);
    timer = requestAnimationFrame(() => {this.run();});
  }
}



