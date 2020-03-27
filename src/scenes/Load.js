class Load extends Phaser.Scene {
    constructor() {
        super('loadScene');
    }

    preload() {
        // set up loading bar (to-do)

        // load graphics assets
        this.load.image('paddle', './assets/img/paddle.png');
        this.load.image('fragment', './assets/imag/fragment.png');
        // load audio assets (to-do)
    }

    create() {
        // check for local storage browser support (to-do)

        // go to Title scene
        this.scene.start('titleScene');
    }
}