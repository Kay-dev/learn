// 设置画布
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

var p = document.querySelector("p");
var ballNum = 0;

function random(min, max) {
  // 生成随机数的函数
  do {
    result = Math.floor(Math.random() * (max - min)) + min;
  } while (result === 0);
  return result;
}

function randomColor() {
  return (
    "rgb(" + random(0, 255) + "," + random(0, 255) + "," + random(0, 255) + ")"
  );
}

class Shape {
  _exist = true;

  constructor(x, y, vx, vy) {
    this._x = x;
    this._y = y;
    this._vx = vx;
    this._vy = vy;
  }

  get exist() {
    return this._exist;
  }

  set exist(value) {
    this._exist = value;
  }

  get x() {
    return this._x;
  }

  set x(value) {
    this._x = value;
  }

  get y() {
    return this._y;
  }

  set y(value) {
    this._y = value;
  }

  get vx() {
    return this._vx;
  }

  set vx(value) {
    this._vx = value;
  }

  get vy() {
    return this._vy;
  }

  set vy(value) {
    this._vy = value;
  }
}

class EvilCircle extends Shape {
  get color() {
    return this._color;
  }

  set color(value) {
    this._color = value;
  }

  get size() {
    return this._size;
  }

  set size(value) {
    this._size = value;
  }

  _color = "white";
  _size = 10;

  constructor(x, y, exist) {
    super(x, y, 20, 20);
    this._exist = exist;
  }

  draw() {
    // 声明要开始绘制
    ctx.beginPath();
    ctx.lineWidth = 3;
    // 声明图形颜色
    ctx.strokeStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    // 填充颜色，并结束绘制
    ctx.stroke();
  }

  checkBounds() {
    if (this.x + this.size >= width) {
      this.x = width - this.size;
    }
    if (this.x - this.size <= 0) {
      this.x = this.size;
    }
    if (this.y + this.size >= height) {
      this.y = height - this.size;
    }
    if (this.y - this.size <= 0) {
      this.y = this.size;
    }
  }

  setControls() {
    window.onkeydown = (e) => {
      switch (e.key) {
        case "a":
          this.x -= this.vx;
          break;
        case "d":
          this.x += this.vx;
          break;
        case "w":
          this.y -= this.vy;
          break;
        case "s":
          this.y += this.vy;
          break;
        default:
      }
    };
  }

  collisionDetect() {
    for (let ball of balls) {
      if (ball !== this && ball.exist) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx ** 2 + dy ** 2);
        if (distance <= this.size + ball.size) {
          ball.exist = false;
          p.textContent = ballNum--;
        }
      }
    }
  }
}

class Ball extends Shape {
  constructor(x, y, vx, vy, color, size) {
    super(x, y, vx, vy);
    this._color = color;
    this._size = size;
  }

  draw() {
    // 声明要开始绘制
    ctx.beginPath();
    // 声明图形颜色
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    // 填充颜色，并结束绘制
    ctx.fill();
  }

  update() {
    if (this.x + this.size >= width || this.x - this.size <= 0) {
      this.vx = -this.vx;
    }
    if (this.y + this.size >= height || this.y - this.size <= 0) {
      this.vy = -this.vy;
    }
    this.x += this.vx;
    this.y += this.vy;
  }

  collisionDetect() {
    for (let ball of balls) {
      if (ball !== this && ball.exist) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx ** 2 + dy ** 2);
        if (distance <= this.size + ball.size) {
          ball.color = randomColor();
          this.color = randomColor();
        }
      }
    }
  }

  get color() {
    return this._color;
  }

  set color(value) {
    this._color = value;
  }

  get size() {
    return this._size;
  }

  set size(value) {
    this._size = value;
  }
}

let balls = [];

let evilCircle = new EvilCircle(random(0, width), random(0, height), true);
evilCircle.setControls();
while (balls.length < 25) {
  let size = random(10, 25);
  let ball = new Ball(
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-5, 5),
    random(-5, 5),
    randomColor(),
    size
  );
  balls.push(ball);
  p.textContent = ballNum = balls.length;
  console.log(ballNum);
}

function loop() {
  ctx.fillStyle = "rgb(0,0,0,0.25)";
  ctx.fillRect(0, 0, width, height);
  for (const ballsKey of balls) {
    if (ballsKey.exist) {
      ballsKey.draw();
      ballsKey.update();
      ballsKey.collisionDetect();
    }
  }
  evilCircle.draw();
  evilCircle.checkBounds();
  evilCircle.collisionDetect();
  requestAnimationFrame(loop);
}

loop();
