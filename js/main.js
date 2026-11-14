import { Bird } from "./entities/bird.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Real game Resolution
canvas.width = 400;
canvas.height = 600;

// Craete bird
const bird = new Bird(100, 250);

function gameLoop() {

    ctx.fillStyle = "#70c5ce"

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    // Update bird phyics
    bird.update();

    // Draw bird
    bird.draw(ctx);

    // Ask browser for the next frame
    requestAnimationFrame(gameLoop);
}

gameLoop();

console.log("Flappy Bird loaded!")