const rulesButton = document.querySelector("#rules-btn");
const closeButton = document.querySelector("#close-btn");
const rulesDiv = document.querySelector("#rules");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

let score = 0;
const brickRowCount = 5;
const brickColumnCount = 9;

const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: 10,
  speed: 4,
  dx: 4,
  dy: -4
};

const paddle = {
  x: canvas.width / 2 - 40,
  y: canvas.height - 20,
  w: 80,
  h: 10,
  speed: 8,
  dx: 0
};

const brickInfo = {
  w: 70,
  h: 20,
  padding: 10,
  offsetX: 45,
  offsetY: 60,
  visible: true
};

const bricks = [];
for (let i = 0; i < brickRowCount; i++) {
  bricks[i] = [];
  for (let j = 0; j < brickColumnCount; j++) {
    const x = j * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX;
    const y = i * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY;
    bricks[i][j] = { x, y, ...brickInfo };
  }
}

function drawBricks() {
  bricks.forEach((row) => {
    row.forEach((brick) => {
      ctx.beginPath();
      ctx.rect(brick.x, brick.y, brick.w, brick.h);
      ctx.fillStyle = brick.visible ? "#0095dd" : "transparent";
      ctx.fill();
      ctx.closePath();
    });
  });
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
  ctx.fillStyle = "#0095dd";
  ctx.fill();
  ctx.closePath();
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
  ctx.fillStyle = "#0095dd";
  ctx.fill();
  ctx.closePath();
}

function drawScore() {
  ctx.font = "20px Arial";
  ctx.fillText(`Score: ${score}`, canvas.width - 100, 30);
}

function movepaddle() {
  paddle.x += paddle.dx;
  if (paddle.x + paddle.w > canvas.width) {
    paddle.x = canvas.width - paddle.w;
  } else if (paddle.x < 0) {
    paddle.x = 0;
  }
}

function resetBricks() {
  bricks.forEach((row) => {
    row.forEach((brick) => {
      brick.visible = true;
    });
  });
}

function moveBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;
  if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
    ball.dx *= -1;
  }
  if (ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
    ball.dy *= -1;
  }
  if (
    ball.x - ball.size > paddle.x &&
    ball.x + ball.size < paddle.x + paddle.w &&
    ball.y + ball.size > paddle.y
  ) {
    ball.dy = -ball.speed;
  }
  bricks.forEach((row) => {
    row.forEach((brick) => {
      if (brick.visible) {
        if (
          ball.x - ball.size > brick.x &&
          ball.x + ball.size < brick.x + brick.w &&
          ball.y + ball.size > brick.y &&
          ball.y - ball.size < brick.y + brick.h
        ) {
          brick.visible = false;
          ball.dy *= -1;
          score++;
          if (score % (brickRowCount * brickColumnCount) == 0) {
            resetBricks();
          }
        }
      }
    });
  });
  if (ball.y + ball.size > canvas.height) {
    resetBricks();
    score = 0;
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawBall();
  drawPaddle();
  drawScore();
}

function update() {
  movepaddle();
  moveBall();
  draw();
  requestAnimationFrame(update);
}

function showRules(event) {
  rulesDiv.classList.add("show");
}

function hideRules(event) {
  rulesDiv.classList.remove("show");
}

function keyDown(event) {
  if (event.key === "ArrowRight" || event.key === "Right") {
    paddle.dx = paddle.speed;
  } else if (event.key === "ArrowLeft" || event.key === "Left") {
    paddle.dx = -paddle.speed;
  }
}

function keyUp(event) {
  if (
    event.key === "ArrowRight" ||
    event.key === "Right" ||
    event.key === "ArrowLeft" ||
    event.key === "Left"
  ) {
    paddle.dx = 0;
  }
}

rulesButton.addEventListener("click", showRules);
closeButton.addEventListener("click", hideRules);
document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

update();
