class Title extends Phaser.Scene {
    constructor() {
        super('titleScene');
    }

    create() {
        this.cameras.main.setBackgroundColor('0x985bde');
        // add title screen text
        let title01 = this.add.bitmapText(centerX, centerY, 'shortStack', 'Doodle Runner', 111).setOrigin(0.5).setTintFill(0x2e31F0).setBlendMode('MULTIPLY');
        let title02 = this.add.bitmapText(centerX, centerY, 'shortStack', 'Doodle Runner', 111).setOrigin(0.5).setTintFill(0xb380ed).setBlendMode('MULTIPLY');
        //add game instructions
        this.add.bitmapText(centerX, centerY + textSpacer, 'shortStack', 'by Tony Guizar', 20).setOrigin(0.5).setTintFill(0x2e31F0);
        this.add.bitmapText(centerX, centerY + textSpacer*1.7, 'shortStack', 'Quick press or long press [SPACE] key to jump.', 24).setOrigin(0.5).setTintFill(0x2e31F0);
        this.add.bitmapText(centerX, h - textSpacer, 'shortStack', 'Press [SHIFT] key to Start', 36).setOrigin(0.5).setTintFill(0x2e31F0);

        // title text tween
        this.tweens.add({
            targets: title01,
            duration: 1500,
            angle: { from: -1, to: 1 },
            yoyo: true,
            repeat: -1,
            onYoyo: function() {
                this.cameras.main.shake(100, 0.0295);
            },
            onYoyoScope: this
        });
        this.tweens.add({
            targets: title02,
            duration: 1500,
            angle: { from: 1, to: -1 },
            yoyo: true,
            repeat: -1,
            onRepeat: function() {
                this.cameras.main.shake(100, 0.0295);
            },
            onRepeatScope: this
        });

        // set up cursor keys
        cursors = this.input.keyboard.createCursorKeys();  
    }

    update() {
        // check for SHIFT input
        if (Phaser.Input.Keyboard.JustDown(cursors.shift)) {
            // start next scene
            this.scene.start('playScene');
        }
    }
}