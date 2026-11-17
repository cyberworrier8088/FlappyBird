export class AudioManger {
    constructor() {
        this.bgm = new Audio("./assets/music/bgm.mp3");
        this.hit = new Audio("./assets/music/hit.mp3");
        this.wings = new Audio("./assets/music/wings.mp3");
        this.point = new Audio("./assets/music/point.mp3");

        // Background music settings
        this.bgm.loop = true;
        this.bgm.volume = 0.35;

        // sound effect volume
        this.hit.volume = 0.7;
        this.wings.volume = 0.5;

        this.point.volume = 0.7;
    }

    playBGM() {
        if (this.bgm.paused) {
            this.bgm.play().catch(console.warn);
        }
    }

    stopBGM() {
        this.bgm.pause();
        this.bgm.currentTime = 0;
    }

    playHit() {
        this.hit.currentTime = 0;
        this.hit.play().catch(console.warn);
    }

    playWings() {
        this.wings.currentTime = 0;
        this.wings.play().catch(console.warn);
    }

    playPoint() {
        this.point.currentTime = 0;
        this.point.play().catch(console.warn);
    }
}