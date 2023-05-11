class spikeBall extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, velocity) {
        // call Phaser Physics Sprite constructor
        super(scene, game.config.width - 80, Phaser.Math.Between(game.config.height - 150 , game.config.height/3), 'spikeBall'); 
        
        this.parentScene = scene;               // maintain scene context

        // set up physics sprite
        this.parentScene.add.existing(this);    // add to existing scene, displayList, updateList
        this.parentScene.physics.add.existing(this);    // add to physics system
        this.setVelocityX(velocity);            // make it go!
        this.displayHeight= 80;
        this.displayWidth= 80;
        this.setGravity(0, 4000);
        this.setBounce(Phaser.Math.Between(0.4, 1.11));                  
        this.play('spinBall');
        this.newspikeBall = true;     
        
        //set collider
        this.parentScene.physics.add.collider(this, this.parentScene.ground);// custom property to control spikeBall spawning
    }

    update() {
        // add new spikeBall when existing spikeBall hits center X
        if(this.newspikeBall && this.x < centerX) {
            // (recursively) call parent scene method from this context
            this.parentScene.addspikeBall(this.parent, this.velocity);
            this.newspikeBall = false;
        }

        // destroy paddle if it reaches the left edge of the screen
        if(this.x < -this.width) {
            this.destroy();
        }
    }
}