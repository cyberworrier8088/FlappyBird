export function checkPipeCollision(bird, pipe) {

    // slighty smaller bird hitbox for fairer collisions
    const padding = 8;

    const birdLeft = bird.x + padding;
    const birdRight = bird.x + bird.width - padding;
    const birdTop = bird.y + padding;
    const birdBottom = bird.y + bird.height - padding;


    // include the pipe caps in the horizontal hitbox
    const capExtraWidth = 8;

    const pipeLeft = pipe.x - capExtraWidth;
    const pipeRight = pipe.x + pipe.width + capExtraWidth;

    const overlapsHorizontally = birdRight > pipeLeft && birdLeft < pipeRight;

    if (!overlapsHorizontally) {
        return false;
    }

    const hitsTopPipe = birdTop < pipe.topHeight;
    const hitsBottomPipe = birdBottom > pipe.bottomY;

    return hitsTopPipe || hitsBottomPipe;
}