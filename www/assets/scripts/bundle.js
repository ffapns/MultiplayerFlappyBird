var Flappy;
(function(Flappy) {
    class Floor extends Phaser.TileSprite {
        constructor(game, height, key) {
            super(game, Flappy.Global.Constants.worldOffset, Flappy.Global.Constants.gameHeight, Flappy.Global.Constants.gameWidth, height, key);
            this.game.physics.enable(this, Phaser.Physics.ARCADE);
            this.body.immovable = true;
            this.body.allowGravity = false;
            this.anchor.y = 1;
            this.game.add.existing(this);
        }
        update() {
            this.width = this.game.world.width;
            this.body.width = this.game.world.width;
        }
    }
    Flappy.Floor = Floor;
})(Flappy || (Flappy = {}));
var Flappy;
(function(Flappy) {
    class Game extends Phaser.Game {
        constructor(elementName) {
            let element = document.getElementById(elementName);
            super(Flappy.Global.Constants.gameWidth, Flappy.Global.Constants.gameHeight, Phaser.AUTO, element.id, Flappy.State.Blank, false, false);
            this.state.add('play', Flappy.State.Play);
            window.addEventListener('resize', (myFunction) => {
                this.scale.setGameSize(Flappy.Global.Constants.gameWidth, Flappy.Global.Constants.gameHeight);
            });
        }
        connect(connectionDetails, callback) {
            Flappy.Global.socket = io.connect(Flappy.Global.Constants.serverUrl, {
                query: `name=${connectionDetails.name}&color=${connectionDetails.color}`
            });
            Flappy.Global.socket.on('connect', () => {
                this.state.start('play');
                callback(Flappy.Global.socket);
            });
            Flappy.Global.connectionDetails = connectionDetails;
        }
    }
    Flappy.Game = Game;
})(Flappy || (Flappy = {}));
var Flappy;
(function(Flappy) {
    class LevelRequester {
        constructor(scoreCounter, pipePool) {
            this.scoreCounter = scoreCounter;
            this.pipePool = pipePool;
            this.requesting = false;
        }
        request(start, end, callback) {
            $.get(`${Flappy.Global.Constants.serverUrl}/stage?start=${start}&end=${end}`, (data) => {
                callback(data);
            });
        }
        update(callback) {
            if (this.requesting === true) {
                return;
            }
            if (Math.abs(this.scoreCounter.score - this.pipePool.length) <= 10) {
                let startIndex = this.pipePool.length;
                this.request(startIndex, startIndex + 20, (pipes) => {
                    callback(pipes);
                    this.requesting = false;
                });
                this.requesting = true;
            }
        }
    }
    Flappy.LevelRequester = LevelRequester;
})(Flappy || (Flappy = {}));
var Flappy;
(function(Flappy) {
    class PlayerManager {
        constructor(game, birdParams) {
            this.game = game;
            this.birdParams = birdParams;
            this.players = new Map();
            this.group = this.game.add.group();
        }
        listen() {
            Flappy.Global.socket.on('position', (data) => {
                let player = this.players.get(data.id);
                if (player === undefined) {
                    return;
                }
                this.game.physics.arcade.moveToXY(player, data.x, data.y, 6000, 20);
                player.angle = data.angle;
            });
            Flappy.Global.socket.on('new-player', (data) => {
                this.createPlayer(data);
            });
            Flappy.Global.socket.on('jump', (data) => {
                if (!this.players.has(data.id)) {
                    return;
                }
                let player = this.players.get(data.id);
                player.jump();
            });
            Flappy.Global.socket.on('death', (data) => {
                if (!this.players.has(data.id)) {
                    return;
                }
                let player = this.players.get(data.id);
                player.deathSequence();
            });
            Flappy.Global.socket.on('disconnected', (data) => {
                if (!this.players.has(data.id)) {
                    return;
                }
                let player = this.players.get(data.id);
                player.destroy();
            });
        }
        createPlayersFromServer() {
            $.get(`${Flappy.Global.Constants.serverUrl}/players`, (data) => {
                this.createPlayers(data);
            });
        }
        createPlayers(data) {
            for (let player of data) {
                if (player.id === Flappy.Global.socket.id) {
                    return;
                }
                this.createPlayer(player);
            }
        }
        createPlayer(data) {
            if (this.players.has(data.id)) {
                return;
            }
            let player = new Flappy.MultiplayerBird(this.game, -1000, -1000, data.name, data.color, this.birdParams);
            this.group.add(player);
            this.players.set(data.id, player);
        }
    }
    Flappy.PlayerManager = PlayerManager;
})(Flappy || (Flappy = {}));
var Flappy;
(function(Flappy) {
    class ScoreCounter extends Phaser.Text {
        constructor(game) {
            super(game, Flappy.Global.Constants.gameWidth / 2, 30, '0', {
                font: '40px flappy',
                fill: 'white'
            });
            this.stroke = 'black';
            this.strokeThickness = 8;
            this.anchor.x = 0.5;
            this.fixedToCamera = true;
            this.checkPoints = new Map();
            this.pointSound = this.game.add.audio('point');
            this.game.add.existing(this);
        }
        increment(pipe) {
            if (this.checkPoints.has(pipe)) {
                return;
            }
            this.checkPoints.set(pipe, true);
            this.pointSound.play();
        }
        update() {
            this.cameraOffset.x = Flappy.Global.Constants.gameWidth / 2;
            this.text = this.score.toString();
        }
        get score() {
            return this.checkPoints.size;
        }
        restart() {
            this.checkPoints = new Map();
        }
    }
    Flappy.ScoreCounter = ScoreCounter;
})(Flappy || (Flappy = {}));
var Flappy;
(function(Flappy) {
    class Sky extends Phaser.TileSprite {
        constructor(game, height, key, offset) {
            super(game, 0, Flappy.Global.Constants.gameHeight - offset, Flappy.Global.Constants.gameWidth, height, key);
            this.fixedToCamera = true;
            this.anchor.y = 1;
            this.game.add.existing(this);
        }
        update() {
            this.width = Flappy.Global.Constants.gameWidth;
        }
    }
    Flappy.Sky = Sky;
})(Flappy || (Flappy = {}));
var Flappy;
(function(Flappy) {
    class TutorialSplash extends Phaser.Sprite {
        constructor(game, params) {
            super(game, Flappy.Global.Constants.gameWidth / 2, Flappy.Global.Constants.gameHeight / 2, params.key);
            this.fixedToCamera = true;
            this.anchor.set(0.5, 0.5);
            this.game.add.existing(this);
        }
        update() {
            this.cameraOffset.x = Flappy.Global.Constants.gameWidth / 2;
            this.cameraOffset.y = Flappy.Global.Constants.gameHeight / 2;
        }
    }
    Flappy.TutorialSplash = TutorialSplash;
})(Flappy || (Flappy = {}));
var Flappy;
(function(Flappy) {
    class BaseBird extends Phaser.Sprite {
        constructor(game, x, y, tint, params) {
            super(game, x, y, params.key);
            this.game.physics.enable(this, Phaser.Physics.ARCADE);
            this.animations.add('fly');
            this.animations.play('fly', 3, true);
            this.anchor.set(0.5, 0.5);
            this.hitSound = this.game.add.audio(params.hitSoundKey);
            this.dieSound = this.game.add.audio(params.dieSoundKey);
            this.wingSound = this.game.add.audio(params.windSoundKey);
            let colorSprite = new Phaser.Sprite(game, 0, 0, params.colorKey);
            colorSprite.anchor.set(0.5, 0.5);
            colorSprite.animations.add('fly');
            colorSprite.animations.play('fly', 3, true);
            colorSprite.blendMode = PIXI.blendModes.OVERLAY;
            colorSprite.alpha = 0.7;
            this.game.physics.enable(colorSprite, Phaser.Physics.ARCADE);
            colorSprite.body.allowGravity = false;
            colorSprite.tint = tint;
            this.addChild(colorSprite);
        }
        jump(volume) {
            this.wingSound.play('', 0, volume);
        }
        deathSequence(volume) {
            this.hitSound.play('', 0, volume);
            setTimeout(() => {
                this.dieSound.play('', 0, volume);
            }, 300);
        }
    }
    Flappy.BaseBird = BaseBird;
})(Flappy || (Flappy = {}));
var Flappy;
(function(Flappy) {
    const JUMP_TILT_ANGLE = -70;
    class Bird extends Flappy.BaseBird {
        constructor(game, floorHeight, tint, params) {
            super(game, 100, 0, tint, params);
            this.floorHeight = floorHeight;
            this.currentSpeed = 0;
            this.restart();
            this.game.add.existing(this);
        }
        update() {
            if (this.body.velocity.y >= Flappy.Global.Constants.terminalVelocity) {
                this.body.velocity.y = Flappy.Global.Constants.terminalVelocity;
            }
            if (this.y <= -100) {
                this.y = -100;
            }
            if (this.y >= Flappy.Global.Constants.gameHeight - this.floorHeight) {
                this.y = Flappy.Global.Constants.gameHeight - this.floorHeight;
            }
            this.angle = this.calculateAngle(this.body.velocity.y);
            this.x += this.game.time.elapsed * this.currentSpeed;
            Flappy.Global.socket.emit('position', {
                angle: this.angle,
                x: this.x,
                y: this.y,
            });
        }
        deathSequence() {
            if (this.isStopped) {
                return;
            }
            this.stop();
            super.deathSequence();
            this.game.input.onDown.remove(this.jumpLambda, this);
            Flappy.Global.socket.emit('death');
        }
        jump() {
            super.jump();
            this.body.velocity.y = -Flappy.Global.Constants.jumpSpeed;
        }
        stop() {
            this.currentSpeed = 0;
        }
        get isStopped() {
            return this.currentSpeed === 0;
        }
        restart() {
            let y = this.getRandomStartingY(this.floorHeight);
            let x = this.getRandomStartingX();
            this.reset(x, y);
            this.body.allowGravity = false;
            this.idleTween = this.game.add.tween(this).to({
                y: this.y - 10
            }, 1000, Phaser.Easing.Linear.None, false, 0, -1, true);
            this.idleTween.start();
            this.game.input.onDown.add(this.jumpLambda, this);
        }
        calculateAngle(speed) {
            let angle = Flappy.Global.Utility.map(speed, -Flappy.Global.Constants.jumpSpeed, Flappy.Global.Constants.terminalVelocity, JUMP_TILT_ANGLE, 90);
            return angle;
        }
        jumpLambda() {
            if (this.body.allowGravity === false) {
                this.body.allowGravity = true;
                this.currentSpeed = Flappy.Global.Constants.gameSpeed;
                this.idleTween.stop();
            }
            Flappy.Global.socket.emit('jump');
            this.jump();
        }
        getRandomStartingY(offset) {
            let availableHeight = Flappy.Global.Constants.gameHeight - offset;
            let adjustedLocation = Flappy.Global.Utility.map(Math.random(), 0, 1, 0.2, 0.8);
            return adjustedLocation * availableHeight;
        }
        getRandomStartingX() {
            let availableHeight = 200;
            let adjustedLocation = Flappy.Global.Utility.map(Math.random(), 0, 1, 0.2, 0.8);
            return adjustedLocation * availableHeight;
        }
    }
    Flappy.Bird = Bird;
})(Flappy || (Flappy = {}));
var Flappy;
(function(Flappy) {
    class MultiplayerBird extends Flappy.BaseBird {
        constructor(game, x, y, displayName, tint, params) {
            super(game, x, y, tint, params);
            this.displayName = displayName;
            this.body.allowGravity = false;
            this.nameTag = new Phaser.Text(game, 0, -35, displayName, {
                font: '12px flappy',
                fill: 'white'
            });
            this.nameTag.stroke = 'black';
            this.nameTag.strokeThickness = 2;
            this.nameTag.anchor.x = 0.5;
            this.addChild(this.nameTag);
        }
        deathSequence() {
            let volume = this.calculateVolume();
            super.deathSequence(volume);
        }
        jump() {
            let volume = this.calculateVolume();
            super.jump(volume);
        }
        update() {
            this.nameTag.angle = -this.angle;
            this.nameTag.x = -35 * Math.sin(this.angle * (Math.PI / 180));
            this.nameTag.y = -35 * Math.cos(this.angle * (Math.PI / 180));
        }
        calculateVolume() {
            let offsettedCamera = this.game.camera.x + Flappy.Global.Constants.gameWidth / 2;
            let distance = Math.abs(offsettedCamera - this.x);
            let clampedDistance = Math.min(Math.max(distance, 0), 1000);
            let mappedDistance = Flappy.Global.Utility.map(clampedDistance, 0, 1000, 0, 0.8);
            let volume = 1 - mappedDistance;
            return volume;
        }
    }
    Flappy.MultiplayerBird = MultiplayerBird;
})(Flappy || (Flappy = {}));
var Flappy;
(function(Flappy) {
    var Global;
    (function(Global) {
        class Constants {
            static get serverUrl() {
              if (window.location.href === 'http://192.168.49.1:8100' || window.location.href === 'http://localhost:8100') {
                return 'http://localhost:9001';
              } else {
                return 'https://multiflappybirdserver.herokuapp.com';
              }
            }
            static get gameWidth() {
                let ratio = this.gameHeight / window.innerHeight;
                return window.innerWidth * ratio;
            }
        }
        Constants.gameSpeed = 0.1;
        Constants.jumpSpeed = 500;
        Constants.gapSize = 155;
        Constants.gravity = 2000;
        Constants.pipeSpacing = 200;
        Constants.terminalVelocity = 700;
        Constants.gameHeight = 665;
        Constants.worldOffset = -1000;
        Global.Constants = Constants;
    })(Global = Flappy.Global || (Flappy.Global = {}));
})(Flappy || (Flappy = {}));
var Flappy;
(function(Flappy) {
    var Global;
    (function(Global) {})(Global = Flappy.Global || (Flappy.Global = {}));
})(Flappy || (Flappy = {}));
var Flappy;
(function(Flappy) {
    var Global;
    (function(Global) {
        class Utility {
            static map(input, inputMin, inputMax, outputMin, outputMax) {
                return (input - inputMin) * (outputMax - outputMin) / (inputMax - inputMin) + outputMin;
            }
        }
        Global.Utility = Utility;
    })(Global = Flappy.Global || (Flappy.Global = {}));
})(Flappy || (Flappy = {}));
var Flappy;
(function(Flappy) {
    class DownPipe extends Phaser.Group {
        constructor(game, x, y, params) {
            super(game);
            this.pipeBody = new Phaser.TileSprite(game, x, y, 52, window.innerHeight, params.pipeBodyKey);
            this.pipeCap = new Phaser.Sprite(game, x, y, params.pipeCapKey);
            this.pipeBody.anchor.y = 1;
            this.add(this.pipeBody);
            this.add(this.pipeCap);
            this.game.physics.enable(this, Phaser.Physics.ARCADE);
            this.pipeBody.body.allowGravity = false;
            this.pipeCap.body.allowGravity = false;
        }
        get sprites() {
            return [this.pipeBody, this.pipeCap];
        }
    }
    Flappy.DownPipe = DownPipe;
})(Flappy || (Flappy = {}));
var Flappy;
(function(Flappy) {
    const LEVEL_OFFSET = 500;
    class PipePool extends Phaser.Group {
        constructor(game, floorHeight) {
            super(game);
            this.floorHeight = floorHeight;
            this.game = game;
            this.game.physics.enable(this, Phaser.Physics.ARCADE);
        }
        addPipes(pipes) {
            for (let pipe of pipes) {
                let availableHeight = Flappy.Global.Constants.gameHeight - this.floorHeight - Flappy.Global.Constants.gapSize;
                let adjustedLocation = Flappy.Global.Utility.map(pipe.location, 0, 1, 0.1, 0.9);
                this.create(LEVEL_OFFSET + pipe.index * Flappy.Global.Constants.pipeSpacing, adjustedLocation * availableHeight);
            }
        }
        create(x, y) {
            let obj = this.getFirstExists(false);
            if (!obj) {
                obj = new Flappy.PipeSet(this.game, x, y, Flappy.Global.Constants.gapSize, {
                    pipeBodyKey: 'pipeBody',
                    pipeDownCapKey: 'pipeDownCap',
                    pipeUpCapKey: 'pipeUpCap',
                });
                this.add(obj, true);
            }
        }
        get sprites() {
            let combinedArray = new Array();
            for (let child of this.children) {
                let pipeSet = child;
                combinedArray = combinedArray.concat(pipeSet.sprites);
            }
            return combinedArray;
        }
        get holes() {
            let combinedArray = new Array();
            for (let child of this.children) {
                let pipeSet = child;
                combinedArray = combinedArray.concat(pipeSet.hole);
            }
            return combinedArray;
        }
    }
    Flappy.PipePool = PipePool;
})(Flappy || (Flappy = {}));
var Flappy;
(function(Flappy) {
    class PipeSet extends Phaser.Group {
        constructor(game, x, y, gapSize, params) {
            super(game);
            this.upPipe = new Flappy.UpPipe(game, x, y + gapSize, {
                pipeBodyKey: params.pipeBodyKey,
                pipeCapKey: params.pipeUpCapKey,
            });
            this.add(this.upPipe);
            this.pipeHole = new Phaser.Sprite(game, x + this.upPipe.width, y);
            this.pipeHole.width = 1;
            this.pipeHole.anchor.x = 1;
            this.pipeHole.height = gapSize;
            this.game.physics.enable(this.pipeHole, Phaser.Physics.ARCADE);
            this.pipeHole.body.allowGravity = false;
            this.add(this.pipeHole);
            this.downPipe = new Flappy.DownPipe(game, x, y, {
                pipeBodyKey: params.pipeBodyKey,
                pipeCapKey: params.pipeDownCapKey,
            });
            this.add(this.downPipe);
        }
        get sprites() {
            return this.downPipe.sprites.concat(this.upPipe.sprites);
        }
        get hole() {
            return this.pipeHole;
        }
    }
    Flappy.PipeSet = PipeSet;
})(Flappy || (Flappy = {}));
var Flappy;
(function(Flappy) {
    class UpPipe extends Phaser.Group {
        constructor(game, x, y, params) {
            super(game);
            this.pipeBody = new Phaser.TileSprite(game, x, y, 52, window.innerHeight, params.pipeBodyKey);
            this.pipeCap = new Phaser.Sprite(game, x, y, params.pipeCapKey);
            this.pipeCap.anchor.y = 1;
            this.add(this.pipeBody);
            this.add(this.pipeCap);
            this.game.physics.enable(this, Phaser.Physics.ARCADE);
            this.pipeBody.body.allowGravity = false;
            this.pipeCap.body.allowGravity = false;
        }
        get sprites() {
            return [this.pipeBody, this.pipeCap];
        }
    }
    Flappy.UpPipe = UpPipe;
})(Flappy || (Flappy = {}));
var Flappy;
(function(Flappy) {
    class ReplayButton extends Phaser.Sprite {
        constructor(game, x, y, key) {
            super(game, x, y, key);
            this.anchor.x = 0.5;
            this.originalY = y;
            this.inputEnabled = false;
            this.events.onInputOver.add(() => {
                this.tween = this.game.add.tween(this).to({
                    y: this.originalY - 5
                }, 1000, Phaser.Easing.Linear.None, true, 0, -1, true);
                this.tint = 0xe8e8e8;
            });
            this.events.onInputOut.add(() => {
                this.tween.pause();
                this.game.add.tween(this).to({
                    y: this.originalY
                }, 500, Phaser.Easing.Exponential.Out, true);
                this.tint = 0xffffff;
            });
        }
    }
    Flappy.ReplayButton = ReplayButton;
})(Flappy || (Flappy = {}));
var Flappy;
(function(Flappy) {
    class ScoreBoard extends Phaser.Group {
        constructor(game, params, restartGameLambda) {
            super(game);
            this.gameOver = new Phaser.Sprite(game, Flappy.Global.Constants.gameWidth / 2, Flappy.Global.Constants.gameHeight / 2 - 100, params.gameOverKey);
            this.gameOver.anchor.set(0.5, 0.5);
            this.gameOver.alpha = 0;
            this.add(this.gameOver);
            this.scoreWindow = new Flappy.ScoreWindow(game, Flappy.Global.Constants.gameWidth / 2, Flappy.Global.Constants.gameHeight / 2, {
                bronzeMedalKey: params.bronzeMedalKey,
                goldMedalKey: params.goldMedalKey,
                platinumMedalKey: params.platinumMedalKey,
                scoreWindowKey: params.scoreBoardKey,
                silverMedalKey: params.silverMedalKey,
            });
            this.scoreWindow.alpha = 0;
            this.add(this.scoreWindow);
            this.replayButton = new Flappy.ReplayButton(game, Flappy.Global.Constants.gameWidth / 2, Flappy.Global.Constants.gameHeight / 2 + 70, params.replayButtonKey);
            this.replayButton.alpha = 0;
            this.replayButton.events.onInputDown.add(() => {
                restartGameLambda();
                setTimeout(() => {
                    this.gameOverStatus = false;
                }, 500);
                this.gameOver.alpha = 0;
                this.scoreWindow.alpha = 0;
                this.replayButton.alpha = 0;
                this.replayButton.inputEnabled = false;
            });
            this.add(this.replayButton);
            this.wooshSound = game.add.audio(params.wooshSoundKey);
            this.fixedToCamera = true;
        }
        show(score) {
            this.gameOverStatus = true;
            this.scoreWindow.score = score;
            this.gameOver.y = Flappy.Global.Constants.gameHeight / 2 - 80;
            let gameOverTween = this.game.add.tween(this.gameOver).to({
                alpha: 1,
                y: Flappy.Global.Constants.gameHeight / 2 - 100
            }, 500, Phaser.Easing.Exponential.Out, true, 500);
            gameOverTween.onStart.add(() => {
                this.wooshSound.play();
            });
            this.scoreWindow.y = Flappy.Global.Constants.gameHeight / 2 + 20;
            let scoreBoardTween = this.game.add.tween(this.scoreWindow).to({
                alpha: 1,
                y: Flappy.Global.Constants.gameHeight / 2
            }, 500, Phaser.Easing.Exponential.Out, true, 1500);
            scoreBoardTween.onStart.add(() => {
                this.wooshSound.play();
            });
            this.replayButton.y = Flappy.Global.Constants.gameHeight / 2 + 90;
            let replayButtonTween = this.game.add.tween(this.replayButton).to({
                alpha: 1,
                y: Flappy.Global.Constants.gameHeight / 2 + 70
            }, 500, Phaser.Easing.Exponential.Out, true, 1500);
            replayButtonTween.onComplete.add(() => {
                this.replayButton.inputEnabled = true;
            });
        }
        update() {
            this.gameOver.x = Flappy.Global.Constants.gameWidth / 2;
            this.gameOver.y = Flappy.Global.Constants.gameHeight / 2 - 100;
            this.scoreWindow.x = Flappy.Global.Constants.gameWidth / 2;
            this.scoreWindow.y = Flappy.Global.Constants.gameHeight / 2;
            this.replayButton.x = Flappy.Global.Constants.gameWidth / 2;
            this.replayButton.y = Flappy.Global.Constants.gameHeight / 2 + 70;
        }
        get isGameOver() {
            return this.gameOverStatus;
        }
    }
    Flappy.ScoreBoard = ScoreBoard;
})(Flappy || (Flappy = {}));
var Flappy;
(function(Flappy) {
    class ScoreWindow extends Phaser.Sprite {
        constructor(game, x, y, params) {
            super(game, x, y, params.scoreWindowKey);
            this.anchor.set(0.5, 0.5);
            this.highestScore = 0;
            this.currentScore = new Phaser.Text(game, this.width / 2 - 25, -this.height / 2 + 37, '0', {
                font: '18px flappy',
                fill: 'white'
            });
            this.currentScore.stroke = 'black';
            this.currentScore.strokeThickness = 5;
            this.currentScore.anchor.x = 1;
            this.addChild(this.currentScore);
            this.bestScore = new Phaser.Text(game, this.width / 2 - 25, -this.height / 2 + 78, '0', {
                font: '18px flappy',
                fill: 'white'
            });
            this.bestScore.stroke = 'black';
            this.bestScore.strokeThickness = 5;
            this.bestScore.anchor.x = 1;
            this.addChild(this.bestScore);
            this.bronzeMedal = new Phaser.Sprite(game, -this.width / 2 + 31, -this.height / 2 + 49, params.bronzeMedalKey);
            this.bronzeMedal.visible = false;
            this.addChild(this.bronzeMedal);
            this.silverMedal = new Phaser.Sprite(game, -this.width / 2 + 31, -this.height / 2 + 49, params.silverMedalKey);
            this.silverMedal.visible = false;
            this.addChild(this.silverMedal);
            this.goldMedal = new Phaser.Sprite(game, -this.width / 2 + 31, -this.height / 2 + 49, params.goldMedalKey);
            this.goldMedal.visible = false;
            this.addChild(this.goldMedal);
            this.platinumMedal = new Phaser.Sprite(game, -this.width / 2 + 31, -this.height / 2 + 49, params.platinumMedalKey);
            this.platinumMedal.visible = false;
            this.addChild(this.platinumMedal);
        }
        set score(score) {
            this.currentScore.text = score.toString();
            if (score > this.highestScore) {
                this.highestScore = score;
            }
            this.resetMedalVisibility();
            if (10 <= score && score < 20) {
                this.bronzeMedal.visible = true;
            } else if (20 <= score && score < 30) {
                this.silverMedal.visible = true;
            } else if (30 <= score && score < 40) {
                this.goldMedal.visible = true;
            } else if (40 <= score) {
                this.platinumMedal.visible = true;
            }
            this.bestScore.text = this.highestScore.toString();
        }
        resetMedalVisibility() {
            this.bronzeMedal.visible = false;
            this.silverMedal.visible = false;
            this.goldMedal.visible = false;
            this.platinumMedal.visible = false;
        }
    }
    Flappy.ScoreWindow = ScoreWindow;
})(Flappy || (Flappy = {}));
var Flappy;
(function(Flappy) {
    var State;
    (function(State) {
        const floorHeight = 112;
        class Blank extends Phaser.State {
            preload() {
                this.game.load.image('sky', 'assets/sky.png');
                this.game.load.image('floor', 'assets/land.png');
            }
            create() {
                this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
                this.game.stage.backgroundColor = '#4ec0ca';
                this.game.stage.disableVisibilityChange = true;
                this.floor = new Flappy.Floor(this.game, floorHeight, 'floor');
                this.sky = new Flappy.Sky(this.game, 109, 'sky', floorHeight);
            }
            update() {
                this.game.world.width = Flappy.Global.Constants.gameWidth;
                this.floor.x = 0;
            }
        }
        State.Blank = Blank;
    })(State = Flappy.State || (Flappy.State = {}));
})(Flappy || (Flappy = {}));
var Flappy;
(function(Flappy) {
    var State;
    (function(State) {
        const FLOOR_HEIGHT = 112;
        const SKY_HEIGHT = 109;
        const BIRD_PARAMS = {
            colorKey: 'birdColor',
            dieSoundKey: 'die',
            hitSoundKey: 'hit',
            key: 'bird',
            windSoundKey: 'wing',
        };
        class Play extends Phaser.State {
            preload() {
                this.game.load.spritesheet('bird', 'assets/bird.png', 34, 24);
                this.game.load.spritesheet('birdColor', 'assets/bird-color-layer.png', 34, 24);
                this.game.load.image('sky', 'assets/sky.png');
                this.game.load.image('floor', 'assets/land.png');
                this.game.load.image('pipeBody', 'assets/pipe.png');
                this.game.load.image('pipeDownCap', 'assets/pipe-down.png');
                this.game.load.image('pipeUpCap', 'assets/pipe-up.png');
                this.game.load.image('splash', 'assets/splash.png');
                this.game.load.image('gameOver', 'assets/game-over.png');
                this.game.load.image('scoreBoard', 'assets/score-board.png');
                this.game.load.image('replay', 'assets/replay.png');
                this.game.load.image('bronzeMedal', 'assets/medal-bronze.png');
                this.game.load.image('silverMedal', 'assets/medal-silver.png');
                this.game.load.image('goldMedal', 'assets/medal-gold.png');
                this.game.load.image('platMedal', 'assets/medal-platinum.png');
                this.game.load.audio('wing', ['assets/sounds/sfx_wing.ogg', 'assets/sounds/sfx_wing.mp3']);
                this.game.load.audio('hit', ['assets/sounds/sfx_hit.ogg', 'assets/sounds/sfx_hit.mp3']);
                this.game.load.audio('die', ['assets/sounds/sfx_die.ogg', 'assets/sounds/sfx_die.mp3']);
                this.game.load.audio('woosh', ['assets/sounds/sfx_swooshing.ogg', 'assets/sounds/sfx_swooshing.mp3']);
                this.game.load.audio('point', ['assets/sounds/sfx_point.ogg', 'assets/sounds/sfx_point.mp3']);
            }
            create() {
                this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
                this.game.stage.backgroundColor = '#4ec0ca';
                this.game.stage.disableVisibilityChange = true;
                this.game.world.setBounds(Flappy.Global.Constants.worldOffset, 0, 9000, Flappy.Global.Constants.gameHeight);
                this.game.physics.startSystem(Phaser.Physics.ARCADE);
                this.game.physics.arcade.gravity.y = Flappy.Global.Constants.gravity;
                this.game.input.onDown.add(() => {
                    this.tutorialSplash.visible = false;
                });
                this.sky = new Flappy.Sky(this.game, SKY_HEIGHT, 'sky', FLOOR_HEIGHT);
                this.pipePool = new Flappy.PipePool(this.game, FLOOR_HEIGHT);
                this.floor = new Flappy.Floor(this.game, FLOOR_HEIGHT, 'floor');
                this.bird = new Flappy.Bird(this.game, FLOOR_HEIGHT, Flappy.Global.connectionDetails.color, BIRD_PARAMS);
                this.game.camera.follow(this.bird, Phaser.Camera.FOLLOW_PLATFORMER);
                this.scoreCounter = new Flappy.ScoreCounter(this.game);
                this.playerManager = new Flappy.PlayerManager(this.game, BIRD_PARAMS);
                this.playerManager.createPlayersFromServer();
                this.playerManager.listen();
                this.scoreBoard = new Flappy.ScoreBoard(this.game, {
                    bronzeMedalKey: 'bronzeMedal',
                    gameOverKey: 'gameOver',
                    goldMedalKey: 'goldMedal',
                    platinumMedalKey: 'platMedal',
                    replayButtonKey: 'replay',
                    scoreBoardKey: 'scoreBoard',
                    silverMedalKey: 'silverMedal',
                    wooshSoundKey: 'woosh',
                }, () => {
                    this.bird.restart();
                    this.scoreCounter.restart();
                    this.tutorialSplash.visible = true;
                });
                this.levelRequester = new Flappy.LevelRequester(this.scoreCounter, this.pipePool);
                this.tutorialSplash = new Flappy.TutorialSplash(this.game, {
                    key: 'splash',
                });
                window.addEventListener('resize', (myFunction) => {
                    this.game.camera.follow(this.bird, Phaser.Camera.FOLLOW_PLATFORMER);
                });
            }
            update() {
                this.levelRequester.update((data) => {
                    this.pipePool.addPipes(data);
                    this.game.world.bounds.width += Flappy.Global.Constants.pipeSpacing * data.length;
                });
                if (this.scoreBoard.isGameOver) {
                    return;
                }
                this.game.physics.arcade.collide(this.bird, this.floor, () => {
                    this.bird.deathSequence();
                    this.scoreBoard.show(this.scoreCounter.score);
                    this.game.camera.shake(0.003, 300, true, Phaser.Camera.SHAKE_BOTH, false);
                });
                this.game.physics.arcade.overlap(this.bird, this.pipePool.sprites, () => {
                    this.bird.deathSequence();
                    this.scoreBoard.show(this.scoreCounter.score);
                    this.game.camera.shake(0.003, 300, true, Phaser.Camera.SHAKE_BOTH, false);
                });
                this.game.physics.arcade.overlap(this.bird, this.pipePool.holes, (bird, pipe) => {
                    this.scoreCounter.increment(pipe);
                });
            }
        }
        State.Play = Play;
    })(State = Flappy.State || (Flappy.State = {}));
})(Flappy || (Flappy = {}));
