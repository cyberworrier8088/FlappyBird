import { Bird } from "./entities/bird.js";
import { Pipe } from "./entities/pipe.js";
import { checkPipeCollision } from "./systems/collision.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const startScreen = document.getElementById("startScreen");
const birdSprite = document.getElementById("birdSprite");

// Real game Resolution
canvas.width = 400;
canvas.height = 600;


// Load game Image
const backgroundImage = new Image();
backgroundImage.src = "./assets/background-day.png";

const baseImage = new Image();
baseImage.src = "./assets/base.png";

// Ground settings
const groundHeight = 112;
let groundX = 0;
const groundSpeed = 2;

// Craete bird
const bird = new Bird(100, 250);

const pipes = [];

let pipeTimer = 0;
const pipeInterval = 100;

let score = 0;

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

function restartGame() {

    // reset bird
    bird.reset(100, 250);

    // remove all pipes
    pipes.length = 0;

    // reset pipe timer
    pipeTimer = 0;

    // reset score
    score = 0;

    // reset game state
    gameOver = false;
    gameStarted = true;

    // start with a flap
    bird.flap();

}

function handleInput(event) {
    if (event.code !== "Space") {
        return;
    }

    event.preventDefault();

    // Restart after game Over
    if (gameOver) {
        restartGame();
        return;
    }
    
    // Start game
    if (!gameStarted) {
        startGame();
        return;
    }

    // Flap while playing
    bird.flap();
}

// Mouse click
canvas.addEventListener("click", () => {

    if (gameOver) {
        restartGame();
        return;
    }

    if (!gameStarted) {
        startGame();
        return;
    }

    // Flap while playing
    bird.flap();
});

// KeyBoard
window.addEventListener("keydown", handleInput);


function drawGround() {
    if (!baseImage.complete || baseImage.naturalWidth === 0) {
        return;
    }

    if (gameStarted && !gameOver) {
        groundX -= groundSpeed;

        if (groundX <= -baseImage.width) {
            groundX = 0;
        }
    }

    const groundY = canvas.height - groundHeight;

    ctx.drawImage(baseImage, groundX, groundY);
    
    for (let i = 0; i < 3; i++) {
        ctx.drawImage(
            baseImage,
            groundX + i * baseImage.width,
            groundY
        );
    }
}

function gameLoop() {

    // Draw background
    if (backgroundImage.complete) {
        ctx.drawImage(
            backgroundImage,
            0,
            0,
            canvas.width,
            canvas.height
        );
    }

    drawGround();

    // Update bird only when game is playing
    if (gameStarted && !gameOver) {
        gameOver = bird.update(canvas.height - groundHeight);

        // Count frames
        pipeTimer++;

        if (pipeTimer >= pipeInterval) {
            pipes.push(
                new Pipe(
                    canvas.width,
                    canvas.height - groundHeight
                )
            );

            pipeTimer = 0;
        }

        // Move pipes
        for (const pipe of pipes) {
            pipe.update();
        }

        for (const pipe of pipes) {
            if (checkPipeCollision(bird, pipe)) {
                gameOver = true;
                break;
            }
        }

        while (
            pipes.length > 0 && pipes[0].isOffScreen()
        ) {
            pipes.shift();
        }

        for (const pipe of pipes) {
            if (!pipe.passed && pipe.x + pipe.width < bird.x) {
                pipe.passed = true;
                score++;
            }
        }

    }



    // Move pipes
    for (const pipe of pipes) {
        pipe.draw(ctx);
    }

    // Draw score
    ctx.fillStyle = "white";
    ctx.font = "bold 40px Arial";
    ctx.textAlign = "center";

    ctx.fillText(
        score,
        canvas.width / 2,
        60
    );

    birdSprite.style.left = `${bird.x}px`;
    birdSprite.style.top = `${bird.y}px`;

    const rotation = Math.max(
        -25,
        Math.min(70, bird.velocity * 4)
    );

    birdSprite.style.transform = `rotate(${rotation}deg)`;

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