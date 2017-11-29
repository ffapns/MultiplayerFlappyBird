export class Preload extends Phaser.State{

  introText: any;

  preload(){
    this.game.load.image('tile', '../assets/images/crate_01.png');
    this.game.load.image('tile2', '../assets/images/tile2.png');
    this.game.load.image('explode', '../assets/images/flappygifsmall.gif');
    this.game.load.image('player', '../assets/images/flappygifsmall.gif');
    this.game.load.audio('jump', '../assets/images/jump.wav');
    this.game.load.audio('hit', '../assets/images/sfx_hit.mp3');
  
  }

  create(){   
    this.game.state.start("Main");
  }
  

}
