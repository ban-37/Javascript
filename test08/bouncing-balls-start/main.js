// 设置画布
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

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
function Ball(x,y,veIX,veIY,color,size){
this.x = x;
this.y = y;
this.veIX = veIX;
this.veIY = veIY;
this.color =color;
this.size = size;
}
//添加Ball 的方法
Ball.prototype.draw=function(){
ctx.beginPath();
ctx.fillStyle = this.color;
ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
ctx.fill();


//让小球动起来
/*
前四个部分用来检查小球是否碰到画布的边缘。如果碰到，我们反转小球的速度方向来让它向反方向移动
检查小球的 x 坐标是否大于画布的宽度（小球会从右边缘离开）。
检查小球的 x 坐标是否小于 0（小球会从左边缘离开）。
检查小球的 y 坐标是否大于画布的高度（小球会从下边缘离开）。
检查小球的 y 坐标是否小于 0（小球会从上边缘离开）。
最后两行，我们将 velX 的值加到 x 的坐标上，将 velY 的值加到 y 坐标上
 —— 每次调用这个方法的时候小球就移动这么多。*/
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
  // 为避免绘制错误，球至少离画布边缘球本  
    let ball = new Ball(
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7, 7),
    random(-7, 7),
    randomColor(),
    size
    );
    balls.push(ball);
  }
  
//动画循环，每帧自动更新视图
function loop() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  //用来填充的颜色设置成半透明的rgba(0,0,0,0.25)，也就是让之前的视图留下来一点点，从而你可以看到小球运动时的轨迹
  ctx.fillRect(0, 0, width, height);
  //将整个画布的颜色设置成半透明的黑色。然后使用 fillRect()（这四个参数分别是起始的坐标、绘制的矩形的宽和高）画出一个填充满整个画布的矩形。这是在下一个视图画出来时用来遮住之前的视图的。

  for (let i = 0; i < balls.length; i++) {
    balls[i].draw();
    balls[i].update();
    balls[i].collisionDetect();

  }
  requestAnimationFrame(loop);
  //使用 requestAnimationFrame() 方法再运行一次函数 —— 当一个函数正在运行时传递相同的函数名，从而每隔一小段时间都会运行一次这个函数，这样我们可以得到一个平滑的动画效果。
}
console.log(loop());
loop();
