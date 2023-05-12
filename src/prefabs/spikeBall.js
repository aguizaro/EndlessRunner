class spikeBall extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, velocity) {
        // call Phaser Physics Sprite constructor
        super(scene, game.config.width - 30, Phaser.Math.Between(game.config.height - 150 , game.config.height/3), 'spikeBall'); 
        
        this.parentScene = scene;               // maintain scene context
        this.behindAvatar= false;               //true if the spike ball is behind the avatar

        // set up physics sprite
        this.parentScene.add.existing(this);    // add to existing scene, displayList, updateList
        this.parentScene.physics.add.existing(this);    // add to physics system
        this.setVelocityX(velocity);            // make it go!
        let randomsize= Phaser.Math.Between(30, 120);
        this.displayHeight= randomsize;
        this.displayWidth= randomsize;
        this.setGravity(0, 4000);
        this.setBounce(Phaser.Math.Between(0.8, 1.11));                  
        this.play('spin_ball');
        this.newspikeBall = true;     
        
        //set collider
        this.parentScene.physics.add.collider(this, this.parentScene.ground);
        this.parentScene.physics.add.collider(this, this.parentScene.avatar,this.collision, undefined, this);

       
    }

    update() {
        // add new spikeBall when existing spikeBall hits center X
        if(this.newspikeBall && this.x < centerX - 100 ) {
            // (recursively) call parent scene method from this context
            this.parentScene.addspikeBall(this.parent, this.velocity);
            this.newspikeBall = false;
        }

        //add a point to score, every time the avatar jumps over a spike ball
        if ((!this.behindAvatar) && (this.x < 170)){
            this.parentScene.points++;
            //play different sound if the point is a multipme of 5
            if(this.parentScene.points % 5 == 0){
                this.parentScene.sound.play('pickup2');
                this.parentScene.sound.play('pickup')
            }else{
                this.parentScene.sound.play('pickup');
            }
            this.behindAvatar= true; //reset boolean
        }
        // destroy spikeBall if it reaches the left edge of the screen
        if(this.x < 0) {
            this.destroy();
        }
    }

    collision(){
        //update avatar and destroy spike ball
        this.parentScene.avatarCollision();
        this.destroy();
    }
}