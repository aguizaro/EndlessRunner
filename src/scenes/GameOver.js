class GameOver extends Phaser.Scene {
    constructor() {
        super('gameOverScene');
    }

    create(){
        //this.cameras.main.setBackgroundColor('0x985bde');
        this.gameOverText = this.add.text(game.config.width/2,game.config.height/3, 'GAME OVER',{
            fontFamily: 'Georgia',
            fontSize: 120,
            color: 'Navy'
        }).setOrigin(0.5);
        this.subText = this.add.text(game.config.width/2,game.config.height - 300, 'Press [SHIFT] to play again, [SPACE] to quit',{
            fontFamily: 'Georgia',
            fontSize: 30,
            color: 'darkpurple',
        }).setOrigin(0.5);
    }

    update() {
        // check for SHIFT input
        if (Phaser.Input.Keyboard.JustDown(cursors.shift)) {
            // start next scene
            this.scene.start('playScene');
            console.log('in GameOVER');
        }else if(Phaser.Input.Keyboard.JustDown(cursors.space)){
            this.scene.stop('playScene');
            
            this.scene.start('titleScene');
        }
    }

}