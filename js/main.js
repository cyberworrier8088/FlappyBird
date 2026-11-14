const canvas = document.getElementById("gameCanvas");

const ctx = canvas.getContext("2d");

// Real game Resolution
canvas.width = 400;
canvas.height = 600;

//  Draw background
ctx.fillStyle = "#70c5ce"

ctx.fillRect(
    0,
    0,
    canvas.width,
    canvas.height
);

console.log("Flappy Bird loaded!")