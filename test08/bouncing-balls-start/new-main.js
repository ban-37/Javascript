// 设置画布
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;
const num =document.getElementById('num');
let ballsNum=25;
// 生成随机数的函数

function random(min,max) {
  const num = Math.floor(Math.random() * (max - min)) + min;
  return num;
}
//生成随机颜色
function randomColor (){
  const color= 'rgb('+random(0,255)+','+random(0,255)+','+random(0,255)+')';
  return color;
}

//对象实例化
function Shape(x,y,veIX,veIY,exists){
this.x = x;
this.y = y;
this.veIX = veIX;
this.veIY = veIY;
this.exists = exists;
}
function Ball(x,y,veIX,veIY,exists,color,size)
{
Shape.call(this,x,y,veIX,veIY,exists);
this.color =color;
this.size =size;
}
Ball.prototype = Object.create(Shape.prototype);
Ball.prototype.constructor= Ball;
//添加Ball 的方法
Ball.prototype.draw=function(){
ctx.beginPath();
ctx.fillStyle = this.color;
ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
ctx.fill();
};

//让小球动起来
Ball.prototype.update = function(){
if((this.x+this.size)>=width){
  this.veIX = -(this.veIX);
}

if ((this.x - this.size) <= 0) {
  this.veIX = -(this.veIX);
}

if ((this.y + this.size) >= height) {
  this.veIY = -(this.veIY);
}

if ((this.y - this.size) <= 0) {
  this.veIY = -(this.veIY);
}

this.x += this.veIX;
this.y += this.veIY;
}

//碰撞效果
Ball.prototype.collisionDetect = function() {
  for (let j = 0; j < balls.length; j++) {
    if (this !== balls[j]) {
      const dx = this.x - balls[j].x;
      const dy = this.y - balls[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {
        balls[j].color = this.color = randomColor();
      }
    }
  }
}


//储存小球
let balls = [];
while (balls.length<7) {
  let size =random(10,20);
    let ball = new Ball(
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7, 7),
    random(-7, 7),
    true,
    randomColor(),
    size
    );
    balls.push(ball);
  }
  
//动画循环，每帧自动更新视图
function loop() {
  ctx.fillStyle = 'rgba(0, 0,0, 0.25)';
  //用来填充的颜色设置成半透明的rgba(0,0,0,0.25)，也就是让之前的视图留下来一点点，从而你可以看到小球运动时的轨迹
  ctx.fillRect(0, 0, width, height);

 Evil1.draw();

 Evil1.checkBounds();

 Evil1.collisionDetect();

  for (let i = 0; i < balls.length; i++) {

   if (balls[i].exists == true) {

    balls[i].draw();
    balls[i].update();
    balls[i].collisionDetect();

  }
  requestAnimationFrame(loop);
  //使用 requestAnimationFrame() 方法再运行一次函数 —— 当一个函数正在运行时传递相同的函数名，从而每隔一小段时间都会运行一次这个函数，这样我们可以得到一个平滑的动画效果。
}
}
//创建恶魔圈
function EvilCircle(x,y,veIX=20,veIY=20,exists,color='white',size=10){
Shape.call(this, x,y,veIX,veIY,exists);
this.color=color;
this.size=size;
}
EvilCircle.prototype =Object(Shape.prototype);
EvilCircle.prototype.constructor =EvilCircle;
//定义方法
EvilCircle.prototype.draw =function(){
  ctx.beginPath();
  ctx.lineWidth= 3;
ctx.strokeStyle = this.color;
ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
ctx.stroke();
}

EvilCircle.prototype.checkBounds = function () {

 if ((this.x + this.size) >= width) {

   this.x = this.x - this.size*2;

  }
  
 if ((this.x + this.size) <= 0) {

   this.x = this.x + this.size*2;

  }
  
  if ((this.y + this.size) >= height) {

   this.y = this.y - this.size*2;

  }
  
 if ((this.y + this.size) <= 0) {

   this.y = this.y + this.size*2;

  }
}
EvilCircle.prototype.setControls=function(){
  window.onkeydown = e => {
    switch(e.key) {
      case 'a':
        this.x -= this.velX;
        break;
      case 'd':
        this.x += this.velX;
        break;
      case 'w':
        this.y -= this.velY;
        break;
      case 's':
        this.y += this.velY;
        break;
    }
  };  
}

EvilCircle.prototype.collisionDetect=function(){
  for (let j = 0; j < balls.length; j++) {
    if (balls[j].exists) {
      const dx = this.x - balls[j].x;
      const dy = this.y - balls[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {

       balls[j].exists = false;

       setNum(ballsNum--);

      }
    }
  }
}


let Evil1 = new EvilCircle(

 random(10, 200),

 random(10, 200),

 20,

 20,

 true

);

Evil1.setControls();

function setNum(ballsNum) {

 if (ballsNum <= 0) {

   num.innerHTML = 'Game Over';

 } else {

   num.innerHTML = ballsNum;

  }
}
loop();