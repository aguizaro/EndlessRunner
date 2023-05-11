class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    create(){
        this.power= 0;
        this.anims.create({
             key: 'avatar_run',
             frames: this.anims.generateFrameNames('avatar', { 
                prefix: 'avatar_run',
                suffix: '.png',
                end: 3, 
            }), repeat: -1 });
        
        this.anims.create({
             key: 'avatar_jump',
             frames: this.anims.generateFrameNames('avatar', { 
                prefix: 'avatar_run',
                suffix: '.png',
                start: 3,
                end: 3,
            }), repeat: -1 });
        

        this.background= this.add.tileSprite(w- 200, h, w*5, h*5, 'background').setOrigin(0.5);
        //this.background.scale= .5;

        this.avatar= this.physics.add.sprite(100,500, "avatar").play('avatar_run');
        this.avatar.displayHeight= 100;
        this.avatar.displayWidth= 50;
        this.avatar.setGravity(0, 4000);
        this.onGround= false;


        this.ground= this.physics.add.sprite(w*.15, h*.99, "platform", );
        this.ground.displayWidth= w * 1.75;
        this.ground.setImmovable();

        // set up cursor keys
        cursors = this.input.keyboard.createCursorKeys();

        //set collider
        this.physics.add.collider(this.avatar, this.ground);

        cursors.space.on( "down", this.startJump, this);
        cursors.space.on( "up", this.endJump, this);
    
    }

    update(time, delta){
        this.background.tilePositionX+=speed/30;

        //store boolean if player is on ground or jumping
        if (this.avatar.y < 500){
            this.onGround= false;
            //console.log('jumping');
        }else{
            this.onGround= true;
            //console.log('ground');
        }

        if (this.onGround){
            if (!(this.avatar.anims.currentAnim.key == 'avatar_run')){
                this.avatar.play('avatar_run');
            }
        }else{
            if (!(this.avatar.anims.currentAnim.key == 'avatar_jump')){
                this.avatar.play('avatar_jump');
            }
        }
        
    }

    startJump(){
        console.log("startJump");
        this.timer= this.time.addEvent({
            delay: 7, 
            callback: this.tick,
            callbackScope: this,
            loop: true
        });
    }

    endJump(){
        console.log("endJump");
        this.timer.remove();
        if (this.onGround){
            this.avatar.setVelocityY(-this.power * 150 );
        }
        //console.log("velocity: " + -this.power * 150);
        this.power= 4;
    }

    tick(){
        if (this.power < 12){
            this.power+= .8;
            //console.log("power: " + this.power);
        }
    }
}