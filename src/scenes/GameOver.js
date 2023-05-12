class GameOver extends Phaser.Scene {
    constructor() {
        super('gameOverScene');
    }

    create(){
            this.gameOverText = this.add.text(game.config.width/2,game.config.height/3, 'GAME OVER',{
            fontFamily: 'Georgia',
            fontSize: 120,
            color: 'Navy',
            strokeThickness: 4
        }).setOrigin(0.5);
        this.subText = this.add.text(game.config.width/2,game.config.height - 300, 'Press [LEFT] to play again, [RIGHT] to quit',{
            fontFamily: 'Georgia',
            fontSize: 30,
            color: 'darkpurple',
        }).setOrigin(0.5);
    }

    update() {
        // check for SHIFT input
        if (Phaser.Input.Keyboard.JustDown(cursors.left)) {
            // restart game
            this.bgm.stop();
            this.sound.play('menuSelect');
            this.scene.start('playScene');
        }else if(Phaser.Input.Keyboard.JustDown(cursors.right)){
            //quit game
            this.bgm.stop();
            this.sound.play('menuSelect');
            this.scene.stop('playScene');
            this.scene.start('titleScene');
        }
    }
    //catch bgm as passed argument
    init(data){
        this.bgm= data;
    }

}