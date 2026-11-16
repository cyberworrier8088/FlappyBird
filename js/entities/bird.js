export class Bird {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.width = 60;
        this.height = 60;

        this.velocity = 0;
        this.gravity = 1000;
        this.flapStrength = -350;
        this.maxFallSpeed = 500;

        this.image = new Image();
        this.image.src = "./assets/bird-1.gif"
    }

    update(groundY, deltaTime) {
        // apply gravity
        this.velocity += this.gravity * deltaTime;

        this.velocity = Math.min(
            this.velocity,
            this.maxFallSpeed
        );

        // Move bird
        this.y += this.velocity * deltaTime;

        // Stop at the top
        if (this.y < 0) {
            this.y = 0;
            this.velocity = 0;
        }

        // Ground collision
        if (this.y + this.height >= groundY) {
            this.y = groundY - this.height;
            return true;
        }

        return false;
    }

    reset(x, y) {
        this.x = x;
        this.y = y;
        this.velocity = 0;
    }

    flap() {
        this.velocity = this.flapStrength;
    }
}