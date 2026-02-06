const FIELD_WIDTH = 600;
const FIELD_HEIGHT = 400;
const BALL_SIZE = 20;
const RACKET_WIDTH = 10;
const RACKET_HEIGHT = 80;
const RACKET_SPEED = 6;
const BALL_SPEED = 5;

let ballH = {
  x: FIELD_WIDTH / 2 - BALL_SIZE / 2,
  y: FIELD_HEIGHT / 2 - BALL_SIZE / 2,
  speedX: 0,
  speedY: 0,
};

let scoreLeft = 0;
let scoreRight = 0;

let leftRacketY = FIELD_HEIGHT / 2 - RACKET_HEIGHT / 2;
let rightRacketY = FIELD_HEIGHT / 2 - RACKET_HEIGHT / 2;

const keysPressed = {};

const field = document.getElementById("field");
const ball = document.getElementById("ball");
const racketLeft = document.getElementById("racket-left");
const racketRight = document.getElementById("racket-right");
const scoreDisplay = document.getElementById("score");

field.style.width = `${FIELD_WIDTH}px`;
field.style.height = `${FIELD_HEIGHT}px`;
ball.style.width = `${BALL_SIZE}px`;
ball.style.height = `${BALL_SIZE}px`;

[racketLeft, racketRight].forEach((p) => {
  p.style.width = `${RACKET_WIDTH}px`;
  p.style.height = `${RACKET_HEIGHT}px`;
});
racketRight.style.left = `${FIELD_WIDTH - RACKET_WIDTH}px`;

function startGame() {
  ballH.x = FIELD_WIDTH / 2 - BALL_SIZE / 2;
  ballH.y = FIELD_HEIGHT / 2 - BALL_SIZE / 2;

  const angle = (Math.random() * Math.PI) / 2 - Math.PI / 4;
  const direction = Math.random() > 0.5 ? 1 : -1;

  ballH.speedX = Math.cos(angle) * BALL_SPEED * direction;
  ballH.speedY = Math.sin(angle) * BALL_SPEED;
}

window.addEventListener("keydown", (e) => {
  keysPressed[e.code] = true;
});

window.addEventListener("keyup", (e) => {
  keysPressed[e.code] = false;
});

function updateScore() {
  scoreDisplay.textContent = `${scoreLeft} : ${scoreRight}`;
}

setInterval(() => {
  // Движение ракеток
  if (keysPressed["ShiftLeft"] && leftRacketY > 0) {
    leftRacketY -= RACKET_SPEED;
  }
  if (
    keysPressed["ControlLeft"] &&
    leftRacketY < FIELD_HEIGHT - RACKET_HEIGHT
  ) {
    leftRacketY += RACKET_SPEED;
  }
  if (keysPressed["ArrowUp"] && rightRacketY > 0) {
    rightRacketY -= RACKET_SPEED;
  }
  if (keysPressed["ArrowDown"] && rightRacketY < FIELD_HEIGHT - RACKET_HEIGHT) {
    rightRacketY += RACKET_SPEED;
  }

  ballH.x += ballH.speedX;
  ballH.y += ballH.speedY;

  // Отражение
  if (ballH.y <= 0 || ballH.y >= FIELD_HEIGHT - BALL_SIZE) {
    ballH.speedY = -ballH.speedY;
    ballH.y = ballH.y <= 0 ? 0 : FIELD_HEIGHT - BALL_SIZE;
  }

  // Левая ракетка и гол
  if (ballH.x <= RACKET_WIDTH) {
    if (
      ballH.y + BALL_SIZE >= leftRacketY &&
      ballH.y <= leftRacketY + RACKET_HEIGHT
    ) {
      if (ballH.speedX < 0) {
        ballH.speedX = -ballH.speedX;
        ballH.x = RACKET_WIDTH;
      }
    } else if (ballH.x <= 0 && ballH.speedX !== 0) {
      ballH.speedX = 0;
      ballH.speedY = 0;
      ballH.x = 0;
      scoreRight++;
      updateScore();
    }
  }

  // Правая ракетка и гол
  if (ballH.x >= FIELD_WIDTH - BALL_SIZE - RACKET_WIDTH) {
    if (
      ballH.y + BALL_SIZE >= rightRacketY &&
      ballH.y <= rightRacketY + RACKET_HEIGHT
    ) {
      if (ballH.speedX > 0) {
        ballH.speedX = -ballH.speedX;
        ballH.x = FIELD_WIDTH - BALL_SIZE - RACKET_WIDTH;
      }
    } else if (ballH.x >= FIELD_WIDTH - BALL_SIZE && ballH.speedX !== 0) {
      ballH.speedX = 0;
      ballH.speedY = 0;
      ballH.x = FIELD_WIDTH - BALL_SIZE;
      scoreLeft++;
      updateScore();
    }
  }

  ball.style.left = `${ballH.x}px`;
  ball.style.top = `${ballH.y}px`;
  racketLeft.style.top = `${leftRacketY}px`;
  racketRight.style.top = `${rightRacketY}px`;
}, 1000 / 60);
