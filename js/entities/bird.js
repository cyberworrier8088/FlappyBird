export class Bird {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.width = 60;
        this.height = 60;

        this.velocity = 0;
        this.gravity = 0.4;

        this.image = new Image();
        this.image.src = "./assets/bird-1.gif"
    }

    update(canvasHeight) {
        this.velocity += this.gravity;
        this.y += this.velocity;

        // Stop bird at the top
        if (this.y < 0) {
            this.y = 0;
            this.velocity = 0;
        }

        // check bottom boundary
        if (this.y + this.height >= canvasHeight) {
            this.y = canvasHeight - this.height;
            return true;
        }

        return false;
    }

    flap() {
        this.velocity = -7;
    }
}