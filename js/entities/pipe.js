export class Pipe {
    constructor(canvasWidth, canvasHeight) {
        this.width = 60;
        this.gap = 175;

        this.x = canvasWidth;

        // keep pipe openings awaiy from extreme screen position
        const minTopHeight = 70;
        const safeBottomMargin = 70;

        const maxTopHeight = canvasHeight - this.gap - safeBottomMargin;

        this.topHeight = Math.random() * (maxTopHeight - minTopHeight) + minTopHeight;

        this.bottomY = this.topHeight + this.gap;

        this.speed = 140; // pixels per second
        this.passed = false;
        this.canvasHeight = canvasHeight;
    }
    update(deltaTime) {
        this.x -= this.speed * deltaTime;
    }
    
    isOffScreen() {
        return this.x + this.width < 0;
    }
    
    draw(ctx) {

        const capHeight = 25;
        const capExtraWidth = 8;


        ctx.fillStyle = "#2ecc71";
        
        // Top pipe body
        ctx.fillRect(
            this.x,
            0,
            this.width,
            this.topHeight - capHeight
        );

        // TOp pipe cap
        ctx.fillRect(
            this.x - capExtraWidth,
            this.topHeight - capHeight,
            this.width + capExtraWidth * 2,
            capHeight
        );

        // Bottom pipe cap
        ctx.fillRect(
            this.x - capExtraWidth,
            this.bottomY,
            this.width + capExtraWidth * 2,
            capHeight
        );

        // Bottom pipe body
        ctx.fillRect(
            this.x,
            this.bottomY + capHeight,
            this.width,
            this.canvasHeight - this.bottomY - capHeight
        );

        // Add darker outlines
        ctx.strokeStyle = "#1b8f4e";
        ctx.lineWidth = 3;

        // top pipe outlune
        ctx.strokeRect(
            this.x,
            0,
            this.width,
            this.topHeight - capHeight
        );

        ctx.strokeRect(
            this.x,
            this.bottomY + capHeight,
            this.width,
            this.canvasHeight - this.bottomY - capHeight
        );
    }
}