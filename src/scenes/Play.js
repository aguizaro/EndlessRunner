class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    create(){
        this.power= 0;
        //create player avatar run animation
        this.anims.create({
             key: 'avatar_run',
             frames: this.anims.generateFrameNames('avatar', { 
                prefix: 'avatar_run',
                suffix: '.png',
                end: 3, 
            }), repeat: -1 });
        //create player avater jump animation
        this.anims.create({
             key: 'avatar_jump',
             frames: this.anims.generateFrameNames('avatar', { 
                prefix: 'avatar_run',
                suffix: '.png',
                start: 3,
                end: 3,
            }), repeat: -1 });
        //create spike ball spinning animation
        this.anims.create({
            key: 'spin_ball',
            frames: this.anims.generateFrameNames('spikeBall', { 
               prefix: 'spike_ball',
               suffix: '.png',
               end: 3,
           }), repeat: -1 });
        
        //background as a tile sprite
        this.background= this.add.tileSprite(w- 200, h, w*5, h*5, 'background').setOrigin(0.5);
        //this.background.scale= .5;

        //build player sprite
        this.avatar= this.physics.add.sprite(185,500, "avatar").play('avatar_run');
        this.avatar.displayHeight= 100;
        this.avatar.displayWidth= 50;
        this.avatar.setGravity(0, 4000);
        this.onGround= false;
        //build platform sprite
        this.ground= this.physics.add.sprite(w*.15, h*.99, "platform", );
        this.ground.displayWidth= w * 1.75;
        this.ground.setImmovable();

        // set up spikeBall group
        this.spikeBallGroup = this.add.group({
            runChildUpdate: true    // make sure update runs on group children
        });
        // wait a few seconds before spawning spikeBalls
        this.time.delayedCall(2500, () => { 
            this.addspikeBall(); 
        });

        // set up cursor keys
        cursors = this.input.keyboard.createCursorKeys();

        //set collider
        this.physics.add.collider(this.avatar, this.ground);
        //call jump when space key is pressed
        cursors.space.on( "down", this.startJump, this);
        cursors.space.on( "up", this.endJump, this);
    
    }
     // create new spikeBalls and add them to existing spikeBall group
     addspikeBall() {
        let speedVariance =  Phaser.Math.Between(0, 50);
        let spikeBallObj = new spikeBall(this, -400 - speedVariance);
        this.spikeBallGroup.add(spikeBallObj);
    }

    update(time, delta){
        //constantly scroll tile sprite to simulate running
        this.background.tilePositionX+=speed/30;

        //store boolean if player is on ground or jumping
        if (this.avatar.y < 500){
            this.onGround= false;
            //console.log('jumping');
        }else{
            this.onGround= true;
            //console.log('ground');
        }
        //play run animation on ground and jump animation in the air
        if (this.onGround){
            if (!(this.avatar.anims.currentAnim.key == 'avatar_run')){
                this.avatar.play('avatar_run');
            }
        }else{
            if (!(this.avatar.anims.currentAnim.key == 'avatar_jump')){
                this.avatar.play('avatar_jump');
            }
        }

        // check for collisions
        this.physics.world.collide(this.avatar, this.barrierGroup, this.avatarCollision, null, this);
    }
    //source: https://www.youtube.com/watch?v=fQiUlWlQjYU&t=14s
    //start the jump, start timer that calls tick
    startJump(){
        console.log("startJump");
        this.timer= this.time.addEvent({
            delay: 7, 
            callback: this.tick,
            callbackScope: this,
            loop: true
        });
    }
    //removes timer and performs jump
    endJump(){
        console.log("endJump");
        this.timer.remove();
        if (this.onGround){
            this.avatar.setVelocityY(-this.power * 150 );
        }
        //console.log("velocity: " + -this.power * 150);
        this.power= 4;
    }
    //power builds up the longer space key is down
    tick(){
        if (this.power < 12){
            this.power+= .8;
            //console.log("power: " + this.power);
        }
    }
    //handles avatar collision
    avatarCollision(){
        
    }
}