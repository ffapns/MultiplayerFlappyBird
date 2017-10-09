export class Preload extends Phaser.State{

  preload(){
    this.game.load.image('tile', '../assets/images/crate_01.png');
    this.game.load.image('tile2', '../assets/images/tile2.png');
    this.game.load.image('explode', '../assets/images/flappygifsmall.gif');
    this.game.load.image('player', '../assets/images/flappygifsmall.gif');
  }

  create(){
    this.game.state.start("Main");
  }

}
