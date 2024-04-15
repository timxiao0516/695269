let patterns = [];

function setup() {
  createCanvas(windowWidth,windowHeight );
  angleMode(DEGREES);
  generatePatterns(8); // 生成8个随机图案
}


function draw() {
  background(0);

  for (let pattern of patterns) {
    pattern.move(); // 移动图案
    pattern.display();
  }
}

function generatePatterns(cols) {
  let rows = cols;
  let cellW = width / cols;
  let cellH = height / rows;

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * cellW;
      let y = j * cellH;

      patterns.push(new Pattern(x + cellW / 2, y + cellH / 2));
    }
  }
}

class Pattern {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.angle = random(360);
    this.speed = random(1, 3);
    this.d = random(20, 50);
    this.gradient = this.createRandomGradient(); // 创建渐变色
  }

  createRandomGradient() {
    let p = ["#7e7f83", "#d9c5b2"];
    let gdcolor1 = random(p);
    let gdcolor2 = random(p);

    let gradient = drawingContext.createLinearGradient(0, 0, 0, 30);
    gradient.addColorStop(0, gdcolor1);
    gradient.addColorStop(1, gdcolor2);

    return gradient;
  }

  move() {
    let angleRadians = radians(this.angle); // 将角度转换为弧度
    let dx = cos(angleRadians) * this.speed; // 计算 x 方向的移动量
    let dy = sin(angleRadians) * this.speed; // 计算 y 方向的移动量
    this.x += dx;
    this.y += dy;

    // 检查边界并反弹
    if (this.x - this.d / 2 <= 0 || this.x + this.d / 2 > width) {
      this.angle= - this.angle;
    }
    if (this.y - this.d / 2 <= 0 || this.y + this.d / 2 > height) {
      this.angle = -this.angle;
    }
  }

  display() {
    let d = this.d;

    push();
    translate(this.x, this.y);
    rotate(this.angle); // 直接使用当前角度

    let gradient = this.gradient;
    noStroke();
    drawingContext.fillStyle = gradient;

    arc(0, 0, d, d, 0, 180, PIE);
    arc(d / 4, 0, d / 2, d / 2, 180, 360, PIE);

    fill("#060301");
    arc(-d / 4, 0, d / 2, d / 2, 0, 180, PIE);
    circle(d / 4, -d / 18, d / 4);

    drawingContext.fillStyle = gradient;
    circle(-d / 4, -d / 18, d / 4);

    pop();
  }
}




