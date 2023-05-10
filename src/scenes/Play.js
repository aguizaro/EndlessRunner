class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    create(){
        this.anims.create({
             key: 'ninja_run',
             frames: this.anims.generateFrameNames('ninja', { 
                prefix: 'run_',
                suffix: '.png',
                end: 5, 
            }), repeat: -1 });

        this.anims.create({
             key: 'ninja_jump',
             frames: this.anims.generateFrameNames('ninja', { 
                prefix: 'run_',
                suffix: '.png',
                end: 3,
            }), repeat: -1 });

        this.ninja= this.physics.add.sprite(100,500, "ninja").play('ninja_run');
        // set up cursor keys
        cursors = this.input.keyboard.createCursorKeys();
    }

    update(time, delta){
        if (cursors.space.isDown){
             this.ninja.play('ninja_jump');
            this.ninja.setVelocityY(-speed);
        }else{
            this.ninja.setY(500);
        }



    }
}