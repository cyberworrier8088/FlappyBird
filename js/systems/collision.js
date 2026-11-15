export function checkPipeCollision(bird, pipe) {
    const birdLeft = bird.x;
    const birdRight = bird.x + bird.width;
    const birdTop = bird.y;
    const birdBottom = bird.y + bird.height;
    const pipeLeft = pipe.x;
    const pipeRight = pipe.x + pipe.width;

    const overlapsHorizontally = birdRight > pipeLeft && birdLeft < pipeRight;

    if (!overlapsHorizontally) {
        return false;
    }

    // Bird is inside the top pipe
    const hitsTopPipe = birdTop < pipe.topHeight;

    // Bird is inside the bottom pipe
    const hitsBottomPipe = birdBottom > pipe.bottomY;

    return hitsTopPipe || hitsBottomPipe;
}