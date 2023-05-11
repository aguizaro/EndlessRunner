class Load extends Phaser.Scene {
    constructor() {
        super('loadScene');
    }

    preload() {
        // loading bar
        // see: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/loader/
        let loadingBar = this.add.graphics();
        this.load.on('progress', (value) => {
            loadingBar.clear();                                 // reset fill/line style
            loadingBar.fillStyle(0xFFFFFF, 1);                  // (color, alpha)
            loadingBar.fillRect(0, centerY, w * value, 5);  // (x, y, w, h)
        });
        this.load.on('complete', () => {
            loadingBar.destroy();
        });

        // load graphics assets
        this.load.path = "./assets/";
        this.load.atlas("avatar","img/avatar.png","img/avatar.json");
        this.load.image('background', 'img/background.png');
        this.load.image("platform", "img/platform.png");
        // load font
        this.load.bitmapFont('shortStack', 'font/shortStack.png', 'font/shortStack.xml');
        
    }

    create() {
        // go to Title scene
        this.scene.start('titleScene');
    }
}