import { Bird } from "./entities/bird.js";
import { Pipe } from "./entities/pipe.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const startScreen = document.getElementById("startScreen");
const birdSprite = document.getElementById("birdSprite");

// Real game Resolution
canvas.width = 400;
canvas.height = 600;

// Craete bird
const bird = new Bird(100, 250);

const pipes = [];

let pipeTimer = 0;
const pipeInterval = 100;

let gameStarted = false;
let gameOver = false;

function startGame() {
    if (!gameStarted && !gameOver) {
        gameStarted = true;

        // Hide start screen
        startScreen.style.display = "none";
        
        // First flap
        bird.flap();
    }
}

function handleInput(event) {
    if (event.code === "Space") {
        event.preventDefault();
    }

    // Start the game
    if (!gameStarted && !gameOver) {
        startGame();
        return;
    }

    // Flap while playing
    if (gameStarted && !gameOver) {
        bird.flap();
    }
}

// Mouse click
canvas.addEventListener("click", () => {
    if (!gameStarted && !gameOver) {
        startGame();
    } else if (gameStarted && !gameOver) {
        bird.flap();
    }
});

// KeyBoard
window.addEventListener("keydown", handleInput);


function gameLoop() {

    // Draw background
    ctx.fillStyle = "#70c5ce"

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    // Update bird only when game is playing
    if (gameStarted && !gameOver) {
        gameOver = bird.update(canvas.height);

        // Count frames
        pipeTimer++;

        if (pipeTimer >= pipeInterval) {
            pipes.push(
                new Pipe(
                    canvas.width,
                    canvas.height
                )
            );

            pipeTimer = 0;
        }

        while (
            pipes.length > 0 && pipes[0].isOffScreen()
        ) {
            pipes.shift();
        }

    }

    // Move pipes
    for (const pipe of pipes) {
        pipe.draw(ctx);
    }

    birdSprite.style.left = `${bird.x}px`;
    birdSprite.style.top = `${bird.y}px`;

    // show Game Over
    if (gameOver) {
        ctx.fillStyle = "white";
        ctx.font = "bold 40px Arial";
        ctx.textAlign = "center";

        ctx.fillText(
            "GAME OVER",
            canvas.width / 2,
            canvas.height / 2
        );
    }

    // Ask browser for the next frame
    requestAnimationFrame(gameLoop);
}

gameLoop();

console.log("Flappy Bird loaded!")