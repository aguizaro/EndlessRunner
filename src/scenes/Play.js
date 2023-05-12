class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    create(){
        //stops gameOverScene
        this.scene.stop('gameOverScene');
        this.points= 0; //keep track of score

        this.power= 0;
        this.lifePoints= 3;
        this.gameOver= false;
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
        //screen UI
        this.add.rectangle(0,0,game.config.width*2,120, 0xb380ff).setOrigin(0.5);
        this.add.rectangle(game.config.width*2 - 200, 0, game.config.width*2,120, 0xb38fff ).setOrigin(0.5);
        this.lifePointsDisplay= this.add.text(game.config.width - 160, 30, this.lifePoints, { fontFamily: 'impact', fontSize: 40, color: 'Navy' }).setOrigin(0.5);
        this.pointsDisplay= this.add.text(game.config.width - 240, 30, this.points, { fontFamily: 'impact', fontSize: 40, color: 'Navy' }).setOrigin(0.5);

        //build player sprite
        this.avatar= this.physics.add.sprite(200,500, "avatar").play('avatar_run');
        this.avatar.displayHeight= 100;
        this.avatar.displayWidth= 50;
        this.avatar.setGravity(0, 4000);
        //this.avatar.setCollideWorldBounds();
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
        this.time.delayedCall(3000, () => { 
            this.addspikeBall(); 
        });

        // set up cursor keys
        cursors = this.input.keyboard.createCursorKeys();

        //set collider
        this.physics.add.collider(this.avatar, this.ground);
        //call jump when space key is pressed
        this.jumpStart= cursors.space.on( "down", this.startJump, this);
        this.jumpEnd= cursors.space.on( "up", this.endJump, this);
    
    }
     // create new spikeBalls and add them to existing spikeBall group
     addspikeBall() {
        let speedVariance =  Phaser.Math.Between(0, 50);
        let spikeBallObj = new spikeBall(this, -400 - speedVariance);
        this.spikeBallGroup.add(spikeBallObj);
    }

    update(time, delta){
        //set avatar velocity to 0 every frame, so it is not knocked off the platform by world physics
        this.avatar.setVelocityX(0);
        //update health points display and points display
        this.lifePointsDisplay.setText(this.lifePoints);
        this.pointsDisplay.setText(this.points);
        //check if player lost all lives
        if (this.lifePoints <= 0){
            this.gameOver= true;
        }
        //store boolean if player is on ground or jumping
        if (this.avatar.y < 500){
            this.onGround= false;
            //console.log('jumping');
        }else{
            this.onGround= true;
            //console.log('ground');
        }
        if (!this.gameOver){
            //constantly scroll tile sprite to simulate running
            this.background.tilePositionX+=speed/30;
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
        }else{//if the game is over, stop animation, destroy spikeBalls and desable jumping
            this.avatar.stop();
            this.spikeBallGroup.destroy(true);
            this.jumpStart.removeAllListeners();
            this.jumpEnd.removeAllListeners();
            console.log('________GAME OVER ___________');

            //Bring up Game Over scene
            this.scene.launch('gameOverScene');  
        }
        
        
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
        this.lifePoints-=1;
        this.cameras.main.shake();
        
    }
}