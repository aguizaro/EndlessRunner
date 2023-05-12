class Title extends Phaser.Scene {
    constructor() {
        super('titleScene');
    }

    create() {
        //stops gameOverScene
        this.scene.stop('gameOverScene');
        //background color
        this.cameras.main.setBackgroundColor('0xb38fff');
        // add title screen text
        this.add.text(centerX, centerY - textSpacer, 'Spike Ball Runner', { fontFamily: 'Impact', fontSize: 130, color: 'Navy' , strokeThickness: 4}).setOrigin(0.5);
        this.add.text(centerX, centerY, 'Game and Assets by Tony Guizar', { fontFamily: 'Georgia', fontSize: 20, color: 'white'}).setOrigin(0.5);
        // add game instructions
        this.add.text(centerX, centerY + textSpacer*1.7, 'Quick press or long press [SPACE] key to jump', { fontFamily: 'Georgia', fontSize: 40, color: 'darkblue' }).setOrigin(0.5);
        this.add.text(centerX, centerY + textSpacer*2.5, 'Press [SHIFT] key to Start', { fontFamily: 'Georgia', fontSize: 40, color: 'darkblue' }).setOrigin(0.5);
        
        // set up cursor keys
        cursors = this.input.keyboard.createCursorKeys();  
    }

    update() {
        // check for SHIFT input
        if (Phaser.Input.Keyboard.JustDown(cursors.shift)) {
            // start next scene
            this.sound.play('menuSelect');
            this.scene.start('playScene');
        }
    }
}