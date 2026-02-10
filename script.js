const game = document.getElementById("game");
const basket = document.getElementById("basket");
const scoreEl = document.getElementById("score");
const livesEl = document.getElementById("lives");
const gameOverScreen = document.getElementById("gameOver");
const finalScore = document.getElementById("finalScore");

let score = 0;
let lives = 3;
let basketX = 140;
let gameLoop;

const fruits = ["🍎", "🍌", "🍉", "🍓", "🍍"];

/* GERAK KERANJANG - MOUSE */
game.addEventListener("mousemove", e => {
  const rect = game.getBoundingClientRect();
  basketX = e.clientX - rect.left - basket.offsetWidth / 2;
  basketX = Math.max(0, Math.min(game.offsetWidth - basket.offsetWidth, basketX));
  basket.style.left = basketX + "px";
});

/* GERAK KERANJANG - KEYBOARD */
document.addEventListener("keydown", e => {
  if (e.key === "ArrowLeft") basketX -= 20;
  if (e.key === "ArrowRight") basketX += 20;

  basketX = Math.max(0, Math.min(game.offsetWidth - basket.offsetWidth, basketX));
  basket.style.left = basketX + "px";
});

/* SPAWN BUAH */
function spawnFruit() {
  const fruit = document.createElement("div");
  fruit.classList.add("fruit");
  fruit.textContent = fruits[Math.floor(Math.random() * fruits.length)];
  fruit.style.left = Math.random() * (game.offsetWidth - 30) + "px";
  fruit.style.animationDuration = (2 + Math.random() * 2) + "s";

  game.appendChild(fruit);

  const check = setInterval(() => {
    const fruitRect = fruit.getBoundingClientRect();
    const basketRect = basket.getBoundingClientRect();

    /* TERTANGKAP */
    if (
      fruitRect.bottom >= basketRect.top &&
      fruitRect.left < basketRect.right &&
      fruitRect.right > basketRect.left
    ) {
      score++;
      scoreEl.textContent = score;
      fruit.remove();
      clearInterval(check);
    }

    /* JATUH */
    if (fruit.offsetTop > game.offsetHeight) {
      lives--;
      livesEl.textContent = lives;
      fruit.remove();
      clearInterval(check);

      if (lives <= 0) endGame();
    }
  }, 20);
}

/* GAME OVER */
function endGame() {
  clearInterval(gameLoop);
  gameOverScreen.style.display = "flex";
  finalScore.textContent = score;
}

/* RESTART */
function restartGame() {
  location.reload();
}

/* START */
gameLoop = setInterval(spawnFruit, 1000);
