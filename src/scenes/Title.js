class Title extends Phaser.Scene {
    constructor() {
        super('titleScene');
    }

    create() {
        // add title screen text
        let title01 = this.add.bitmapText(centerX, centerY, 'shortStack', 'Doodle Runner', 64).setOrigin(0.5).setTint(0xffffff);
        let title02 = this.add.bitmapText(centerX, centerY, 'shortStack', 'Doodle Runner', 64).setOrigin(0.5).setTint(0xff00ff).setBlendMode('SCREEN');
        let title03 = this.add.bitmapText(centerX, centerY, 'shortStack', 'Doodle Runner', 64).setOrigin(0.5).setTint(0xffff00).setBlendMode('ADD');
       
        this.add.bitmapText(centerX, centerY + textSpacer, 'shortStack', 'Quick press or long press [SPACE] key to jump.', 24).setOrigin(0.5);
        this.add.bitmapText(centerX, centerY + textSpacer*3, 'shortStack', 'Press [SHIFT] key to Start', 36).setOrigin(0.5);
        this.add.bitmapText(centerX, h - textSpacer, 'shortStack', 'by Tony Guizar', 16).setOrigin(0.5);

        // title text tween
        this.tweens.add({
            targets: title01,
            duration: 2500,
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
            duration: 2500,
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