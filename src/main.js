// Antonio Guizar Orozco
// Spike Ball Runner v1.1
// Hours Spent: 16
// Creative Tilt: I implemented the use of phaser's light ability to simulate a sun. This took a bit of trial and error to get right. I also made it
//                so that, when the player gets to low health, the ambiance chnages and the score display turns red. I also made my own artwork 
//                and animations. I am not an artist by any means, so getting something like this to work is a great accomplishment and I am pround 
//                to have made this from scratch. 

'use strict';

// define and configure main Phaser game object
let config = {
    parent: 'myGame',
    type: Phaser.AUTO,
    height: 640,
    width: 960,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            //debug: true,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scene: [ Load, Title, Play, GameOver ]
}

// define game
let game = new Phaser.Game(config);

// define globals
let centerX = game.config.width/2;
let centerY = game.config.height/2;
let w = game.config.width;
let h = game.config.height;
const textSpacer = 100;
let cursors;
let speed= 600;