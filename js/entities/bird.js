export class Bird {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.width = 40;
        this.height = 30;

        this.velocity = 0;
        this.gravity = 0.4;
    }

    update() {
        this.velocity += this.gravity;
        this.y += this.velocity;
    }

    draw(ctx) {
        // Bird body
        ctx.fillStyle = "#ffd43b";

        ctx.fillRect(
            this.x,
            this.y,
            this.width,
            this.height
        );

        // Bird eye
        ctx.fillStyle = "white";

        ctx.beginPath();

        ctx.arc(
            this.x + 30,
            this.y + 10,
            7,
            0,
            Math.PI * 2
        );

        ctx.fill();

        // Eye pupila
        ctx.fillStyle = "black";

        ctx.beginPath();

        ctx.arc(
            this.x + 32,
            this.y + 10,
            3,
            0, Math.PI * 2
        );

        ctx.fill();

        // Beak
        ctx.fillStyle = "#ff922b"

        ctx.beginPath();

        ctx.moveTo(
            this.x + this.width,
            this.y + 15
        );

        ctx.lineTo(
            this.x + this.width + 12,
            this.y + 20
        );

        ctx.lineTo(
            this.x + this.width,
            this.y + 25
        );

        ctx.fill();
    }
}