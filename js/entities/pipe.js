export class Pipe {
    constructor(canvasWidth, canvasHeight) {
        this.width = 60;
        this.gap = 160;

        this.x = canvasWidth;

        // Random top pipe height
        const minHeight = 50;
        const maxHeight = canvasHeight - this.gap - minHeight;

        this.topHeight = Math.random() * (maxHeight - minHeight) + minHeight;

        this.bottomY = this.topHeight + this.gap;

        this.speed = 2;
        this.canvasHeight = canvasHeight;
    }
    update() {
        this.x -= this.speed;
    }
    
    isOffScreen() {
        return this.x + this.width < 0;
    }
    
    draw(ctx) {
        ctx.fillStyle = "#2ecc71";
        
        // Top pipe
        ctx.fillRect(
            this.x,
            0,
            this.width,
            this.topHeight
        );
        
        ctx.fillRect(
            this.x,
            this.bottomY,
            this.width,
            this.canvasHeight - this.bottomY
        );
    }
}