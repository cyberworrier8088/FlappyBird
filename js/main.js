import { Bird } from "./entities/bird.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Real game Resolution
canvas.width = 400;
canvas.height = 600;

// Craete bird
const bird = new Bird(100, 250);

let gameOver = false;

// Mouse click
canvas.addEventListener("click", () => {
    if (!gameOver) {
        bird.flap();
    }
});

window.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
        event.preventDefault();
        
        if (!gameOver) {
            bird.flap();
        }
    }
});

function gameLoop() {

    // Draw background
    ctx.fillStyle = "#70c5ce"

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    // Update game only when alive
    if (!gameOver) {
        gameOver = bird.update(canvas.height);
    }

    // Draw bird
    bird.draw(ctx);

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