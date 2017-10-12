import { FirebaseObjectObservable } from 'angularfire2/database/firebase_object_observable';
import { FirebaseProvider } from './../../providers/firebase/firebase';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { HttpserviceProvider } from './../../providers/httpservice/httpservice';
import { Boot } from './game_files/boot';
import { GameOver } from './game_files/gameover';
import { GameTitle } from './game_files/gametitle';
import { Preload } from './game_files/preload';


@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
})
export class GamePage {

  private shareConstant: FirebaseListObservable<any>

  constructor(public navCtrl: NavController, public _firebase:FirebaseProvider, private httpserivceProvider: HttpserviceProvider) {
      // console.log(this.shareConstant);
  }

  ionViewDidLoad() {
    var myGame = new Game();
  }


}



class Main extends Phaser.State {

      player: Phaser.Sprite;

      pipes: Phaser.Group;

      timer: Phaser.TimerEvent;

      score: number;

      labelScore: Phaser.Text;

      jumpSound: Phaser.Sound;

      hitSound: Phaser.Sound;

      tileSpeed: number;

      tileWidth: number;

      tileHeight: number;

      platforms: Phaser.Group;

      breakables: Phaser.Group;

      cursors: Phaser.CursorKeys;

      emitter: any;

      public static jumpSpeed: number = 500;



      create(){

        //Set platforms' speed
        this.tileSpeed = -450;
        //Init score
        this.score = 0;

        //Get tile's dimensions
        this.tileWidth = this.game.cache.getImage('tile').width;
        this.tileHeight = this.game.cache.getImage('tile').height;

        //Set background color
        this.game.stage.backgroundColor = '#71c5cf';

        //Enable the arcade physics system
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        //Add a platforms group to hold all of our tiles, and create a bunch of them
		    this.platforms = this.game.add.group();
		    this.platforms.enableBody = true;
		    this.platforms.createMultiple(50, 'tile');

		    this.breakables = this.game.add.group();
		    this.breakables.enableBody = true;
        this.breakables.createMultiple(20, 'tile2');

        //Add the player to the screen
	    	this.createPlayer();

        //Create the score label
        this.createScore();

        //Add particle emitter for death animation
	      this.emitter = this.add.emitter(0, 0, 20);
	      this.emitter.makeParticles('explode');
	      this.emitter.gravity = 50;

	      //Add an initial platform
		    this.addPlatform();

		    //Add a platform every 2 seconds
		    this.timer = this.game.time.events.loop(3000, this.addPlatform, this);

	      //Enable cursor keys so we can create some controls
	      this.cursors = this.game.input.keyboard.createCursorKeys();

      }

      update(){
        //Make the sprite collide with the ground layer
		    this.game.physics.arcade.overlap(this.player,this.platforms, this.gameOver, null, this);
		    this.game.physics.arcade.collide(this.player, this.breakables,this.collideTile, null, this);
		    this.game.physics.arcade.collide(this.breakables, this.platforms);

		    //Make the sprite jump when the up key is pushed
	      if(this.cursors.up.isDown) {
          this.player.body.velocity.y = -350;
          this.game.add.tween(this.player).to({angle: -20}, 100).start();

          //this.jumpSound.play();
        }


      }

      gameOver(){
        this.particleBurst(this.player.body.position.x + (this.player.body.width / 2), this.player.body.position.y + (this.player.body.height / 2));
        this.player.kill();
        //this.hitSound.play();
        //Wait a little bit before restarting game
        this.game.time.events.add(1000, function(){
          this.game.state.start('Main');
        }, this);
      }

      addTile(x: number, y: number, immovable: boolean){
        var tile;
        if(immovable){
          tile = this.platforms.getFirstDead();
        } else {
          tile = this.breakables.getFirstDead();
        }

        //Reset it to the specified coordinates
        tile.body.gravity.y = 0;
        tile.reset(x, y);
        tile.body.velocity.x = this.tileSpeed;
        tile.body.immovable = immovable;

        //When the tile leaves the screen, kill it
        tile.checkWorldBounds = true;
        tile.outOfBoundsKill = true;
      }

      addPlatform(){
        //Increase the players score
		    this.incrementScore();

        //Speed up the game to make it harder
        this.tileSpeed -= 40;

        //Work out how many tiles we need to fit across the whole screen
        var tilesNeeded = Math.ceil(this.game.world.height / this.tileHeight);

        //Add a hole randomly somewhere
          var hole = Math.floor(Math.random() * (tilesNeeded - 3)) + 1;

          //Keep creating tiles next to each other until we have an entire row
          //Don't add tiles where the random hole is
          for (var i = 0; i < tilesNeeded; i++){
              if (i != hole && i != hole + 1 && i != hole + 2 && i != hole + 3){
                this.addTile(this.game.world.width - this.tileWidth, i * this.tileHeight, true);
              } else {
                this.addTile(this.game.world.width - this.tileWidth, i * this.tileHeight, false);
              }
          }
      }

      collideTile(player: Phaser.Sprite, tile: Phaser.Graphics){
        tile.body.gravity.y = 2000;
      }

      createPlayer(){

        //Add the player to the game by creating a new sprite
		    this.player = this.game.add.sprite(this.game.world.centerX / 2, this.game.world.centerY, 'player');

        //Set the players anchor point to be in the middle horizontally
        this.player.anchor.setTo(-0.2, 0.5);

                  // Add gravity to the bird to make it fall
        //Enable physics on the player
        this.game.physics.arcade.enable(this.player);

        //Make the player fall by applying gravity
        this.player.body.gravity.y = 1000;



        //Make the player collide with the game boundaries
        this.player.body.collideWorldBounds = true;

        //This means the players velocity will be unaffected by collisions
        this.player.body.immovable = true;
      }

      createScore(){
        var scoreFont = "100px Arial";

        this.labelScore = this.game.add.text((this.game.world.centerX), 100, "0", {font: scoreFont, fill: "#fff"});
        this.labelScore.anchor.setTo(0.5, 0.5);
        this.labelScore.align = 'center';
      }

      incrementScore(){

        this.score += 1;
        this.labelScore.text = this.score.toString();
      }

      particleBurst(x: number, y: number){

        this.emitter.x = x;
        this.emitter.y = y;

        this.emitter.start(true, 2000, null, 20);

      }

  }


// class FlappyBird extends Phaser.State{

//         bird: Phaser.Sprite;

//         platforms: Phaser.Group;

//         pipes: Phaser.Group;

//         timer: Phaser.TimerEvent;

//         score: number;

//         stateText: Phaser.Text;

//         labelScore: Phaser.Text;

//         jumpSound: Phaser.Sound;

//         hitSound: Phaser.Sound;

//         player: Phaser.Sprite;

//         tileSpeed: number;
//         tileWidth: number;
//         tileHeight: number;

//         cursors: Phaser.CursorKeys;

//         breakables: Phaser.Group;

//         emitter: any;

//         preload() {

//           // Change the background color of the game
//           this.game.stage.backgroundColor = '#71c5cf';

//           // Load the bird sprite
//           this.game.load.image('bird', '../assets/images/flappygifsmall.gif');

//           this.game.load.image('pipe', '../assets/images/pipe-up.png');

//           this.game.load.image('ground', '../assets/images/land.png')

//           this.game.load.audio('jump', '../assets/images/jump.wav');

//           this.game.load.audio('hit', '../assets/images/sfx_hit.mp3');


//         }


//         create() {

//         // Set the physics system
//           this.game.physics.startSystem(Phaser.Physics.ARCADE);

//           // Display the bird on the screen
//           this.bird = this.game.add.sprite(100, 245, 'bird');

//           // Add gravity to the bird to make it fall
//           this.game.physics.arcade.enable(this.bird);
//           this.bird.body.gravity.y = 1000;
//           this.bird.anchor.setTo(-0.2, 0.5);

//           // Call the 'jump' function when the spacekey is hit
//           var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
//           spaceKey.onDown.add(this.jump, this);

//           this.pipes = this.game.add.group();
//           this.pipes.enableBody = true;
//           this.pipes.createMultiple(100, 'pipe');



//           this.timer = this.game.time.events.loop(1500, this.addRowOfPipes, this);

//           this.score = 0;
//           this.labelScore = this.game.add.text(20, 20, "0", {font: "30px Arial", fill: "#ffffff"});

//           this.stateText = this.game.add.text(this.game.world.centerX,this.game.world.centerY,' ', { font: '30px Arial', fill: '#fff' });
//           this.stateText.anchor.setTo(0.5, 0.5);
//           this.stateText.visible = false;


//           this.platforms = this.game.add.group();
//           this.platforms.enableBody = true;

//           var ground =  this.platforms.create(0, this.game.world.height - 200, 'ground');

//           //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
//           ground.scale.setTo(2, 2);

//           //  This stops it from falling away when you jump on it
//           ground.body.immovable = true;

//             //  Now let's create two ledges


//           this.jumpSound = this.game.add.audio('jump');
//           this.hitSound = this.game.add.audio('hit');
//         }

//         update() {



//           // If the bird is out of the world (too high or too low), call the 'restartGame' function
//           if (this.bird.inWorld == false){
//             this.stateText.text=" GAME OVER \n Click to restart";
//             this.stateText.visible = true;
//             //the "click to restart" handler
//             this.game.input.onTap.addOnce(this.restartGame,this);

//           }


//           this.game.physics.arcade.overlap(this.bird, this.pipes, this.hitPipe, null, this);

//           if (this.bird.angle < 20)
//             this.bird.angle += 1;
//         }






//         jump() {
//           if (this.bird.alive == false)
//             return;

//           this.bird.body.velocity.y = -350;

//           this.game.add.tween(this.bird).to({angle: -20}, 100).start();

//           this.jumpSound.play();
//         }

//         restartGame() {
//           // Start the 'main' state, which restarts the game
//           this.game.state.start('Main');

//         }

//         addOnePipe(x, y) {
//           var pipe = this.pipes.getFirstDead();

//           pipe.reset(x, y);

//           pipe.body.velocity.x = -200;

//           pipe.checkWorldBounds = true;
//           pipe.outOfBoundsKill = true;
//         }

//         addRowOfPipes() {
//           var hole = Math.floor(Math.random() * 5) + 1;

//           for (var i = 0; i < 9; i++)
//             if (i != hole && i != hole + 1)
//               this.addOnePipe(400, i * 60 + 10);
//               this.score += 1;
//               this.labelScore.text = this.score.toString();
//         }

//         hitPipe() {

//           if (this.bird.alive == false)
//           return;
//           this.bird.alive = false;
//           this.hitSound.play();
//           this.game.time.events.remove(this.timer);

//           this.pipes.forEachAlive((p) => {
//             p.body.velocity.x = 0;
//           }, this)

//         }
//   }


class Game extends Phaser.Game {

    constructor() {

        super(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio, Phaser.AUTO, 'content', null);

		    //Add all states
        this.state.add('Boot', Boot);
        this.state.add('Preload', Preload);
        this.state.add('GameTitle', GameTitle);
        this.state.add('Main', Main);
        this.state.add('GameOver', GameOver);

        //Start the first state
        this.state.start('Boot');

    }
}
