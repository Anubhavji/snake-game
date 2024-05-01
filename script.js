const canvas = document.getElementById("snakeGame");
const ctx = canvas.getContext("2d");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");
const gridSize = 20; // Size of each grid cell
const initialSpeed = 150; // Initial game speed in milliseconds
const speedDecrease = 10; // Amount to decrease speed after eating food

let snake = [];
let food = {};
let direction = "right";
let gameOver = false;
let score = 0;
let speed = initialSpeed;
let gameInterval;

// Initialize the snake
function initSnake() {
  snake = [
    { x: 100, y: 200 },
    { x: 80, y: 200 },
    { x: 60, y: 200 },
    { x: 40, y: 200 },
  ];
}

// Generate food randomly
function generateFood() {
  food = {
    x: Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize,
    y: Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize,
  };
}

// Draw the snake
function drawSnake() {
  ctx.fillStyle = "green";
  snake.forEach((segment) => {
    ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
  });
}

// Draw the food
function drawFood() {
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, gridSize, gridSize);
}

// Move the snake
function moveSnake() {
  const head = { x: snake[0].x, y: snake[0].y };

  switch (direction) {
    case "up":
      head.y -= gridSize;
      break;
    case "down":
      head.y += gridSize;
      break;
    case "left":
      head.x -= gridSize;
      break;
    case "right":
      head.x += gridSize;
      break;
  }

  // Check for collision with walls
  if (head.x < 0) {
    head.x = canvas.width - gridSize;
  } else if (head.x >= canvas.width) {
    head.x = 0;
  } else if (head.y < 0) {
    head.y = canvas.height - gridSize;
  } else if (head.y >= canvas.height) {
    head.y = 0;
  }

  // Check for self-collision
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      gameOver = true;
      return;
    }
  }

  // Check for food
  if (head.x === food.x && head.y === food.y) {
    generateFood();
    score++;
    speed -= speedDecrease; // Increase the speed after eating food
  } else {
    snake.pop();
  }

  snake.unshift(head);
}

// Game loop
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawSnake();
  drawFood();
  moveSnake();

  if (!gameOver) {
    gameInterval = setTimeout(gameLoop, speed);
  } else {
    alert(`Game Over! Your score is ${score}`);
  }
}

// Handle keyboard events
document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowUp":
      if (direction !== "down") direction = "up";
      break;
    case "ArrowDown":
      if (direction !== "up") direction = "down";
      break;
    case "ArrowLeft":
      if (direction !== "right") direction = "left";
      break;
    case "ArrowRight":
      if (direction !== "left") direction = "right";
      break;
  }
});

// Start the game
startBtn.addEventListener("click", () => {
  initSnake();
  generateFood();
  gameOver = false;
  score = 0;
  speed = initialSpeed;
  gameLoop();
});

// Reset the game
resetBtn.addEventListener("click", () => {
  clearTimeout(gameInterval);
  initSnake();
  generateFood();
  gameOver = false;
  score = 0;
  speed = initialSpeed;
  gameLoop();
});
