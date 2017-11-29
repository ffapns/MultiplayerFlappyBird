webpackJsonp([1],{

/***/ 170:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var ionic_angular_1 = __webpack_require__(54);
var game_1 = __webpack_require__(181);
var firebase_1 = __webpack_require__(83);
var LandingPage = (function () {
    function LandingPage(navCtrl, firebaseProvider, param) {
        this.navCtrl = navCtrl;
        this.firebaseProvider = firebaseProvider;
        this.userProfile = param.get("userProfile");
        console.log(this.userProfile);
    }
    LandingPage.prototype.StartGame = function () {
        this.navCtrl.push(game_1.GamePage);
    };
    LandingPage.prototype.logout = function () {
        this.navCtrl.popToRoot();
    };
    return LandingPage;
}());
LandingPage = __decorate([
    ionic_angular_1.IonicPage(),
    core_1.Component({
        selector: 'page-landing',template:/*ion-inline-start:"C:\Users\fifap\Desktop\mygame\src\pages\landing\landing.html"*/'<ion-content padding class="backgound-image home">\n\n    <ion-grid>\n\n        <ion-row>\n\n            <ion-col col-12>\n                <ion-img style="width: 250px; height: 150px; background: none !important" src="../assets/images/multyFlappyBird.png"></ion-img>\n            </ion-col>\n        </ion-row>\n\n\n        <ion-row>\n            <ion-col col-12>\n                <ion-content>\n                    <ion-list *ngIf="userProfile">\n                        <ion-item style="text-align: center;">\n                            <ion-img style="width: 100px; height: 100px; background: none !important" src="{{userProfile.photoURL}}"></ion-img>\n                        </ion-item>\n                        <ion-item style="text-align: center;">\n                            <h2>Name</h2>\n                            <p>{{userProfile.displayName}}</p>\n                        </ion-item>\n\n                        <ion-item style="text-align: center;">\n                            <h2>Email</h2>\n                            <p>{{userProfile.email}}</p>\n                        </ion-item>\n\n                        <ion-item style="text-align: center;">\n                            <button ion-button color="dark" outline (click)="StartGame()">Start Game</button>\n                        </ion-item>\n                        <ion-item style="text-align: center;">\n                            <button ion-button color="dark" outline (click)="logout()">SignOut</button>\n                        </ion-item>\n                    </ion-list>\n                </ion-content>\n            </ion-col>\n        </ion-row>\n\n    </ion-grid>\n\n\n</ion-content>'/*ion-inline-end:"C:\Users\fifap\Desktop\mygame\src\pages\landing\landing.html"*/,
    }),
    __metadata("design:paramtypes", [ionic_angular_1.NavController,
        firebase_1.FirebaseProvider,
        ionic_angular_1.NavParams])
], LandingPage);
exports.LandingPage = LandingPage;
//# sourceMappingURL=landing.js.map

/***/ }),

/***/ 180:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 180;

/***/ }),

/***/ 181:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var firebase_1 = __webpack_require__(83);
var core_1 = __webpack_require__(1);
var ionic_angular_1 = __webpack_require__(54);
var boot_1 = __webpack_require__(556);
var gameover_1 = __webpack_require__(557);
var gametitle_1 = __webpack_require__(558);
var preload_1 = __webpack_require__(559);
var GamePage = (function () {
    function GamePage(navCtrl, _firebase) {
        this.navCtrl = navCtrl;
        this._firebase = _firebase;
    }
    GamePage.prototype.ionViewDidLoad = function () {
        var myGame = new Game();
    };
    return GamePage;
}());
GamePage = __decorate([
    core_1.Component({
        selector: 'page-game',template:/*ion-inline-start:"C:\Users\fifap\Desktop\mygame\src\pages\game\game.html"*/'<ion-content>\n    <div id="content"></div>\n</ion-content>'/*ion-inline-end:"C:\Users\fifap\Desktop\mygame\src\pages\game\game.html"*/,
    }),
    __metadata("design:paramtypes", [ionic_angular_1.NavController, firebase_1.FirebaseProvider])
], GamePage);
exports.GamePage = GamePage;
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Main.prototype.create = function () {
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
        this.introText = this.game.add.text(this.game.world.centerX, this.game.world.centerY, '- click to restart -', { font: "40px Arial", fill: "#ffffff", align: "center" });
        this.introText.anchor.setTo(0.5, 0.5);
        this.introText.visible = false;
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
    };
    Main.prototype.update = function () {
        //Make the sprite collide with the ground layer
        this.game.physics.arcade.overlap(this.player, this.platforms, this.gameOver, null, this);
        this.game.physics.arcade.collide(this.player, this.breakables, this.collideTile, null, this);
        this.game.physics.arcade.collide(this.breakables, this.platforms);
        //Make the sprite jump when the up key is pushed
        if (this.cursors.up.isDown) {
            this.player.body.velocity.y = -350;
            this.game.add.tween(this.player).to({ angle: -20 }, 100).start();
            //this.jumpSound.play();
        }
    };
    Main.prototype.gameOver = function () {
        this.particleBurst(this.player.body.position.x + (this.player.body.width / 2), this.player.body.position.y + (this.player.body.height / 2));
        this.player.kill();
        //this.hitSound.play();
        //Wait a little bit before restarting game
        // this.game.time.events.add(1000, function(){
        // }, this);
        this.introText.visible = true;
        this.game.input.onTap.addOnce(this.restart, this);
    };
    Main.prototype.restart = function () {
        this.game.state.start('Boot');
    };
    Main.prototype.addTile = function (x, y, immovable) {
        var tile;
        if (immovable) {
            tile = this.platforms.getFirstDead();
        }
        else {
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
    };
    Main.prototype.addPlatform = function () {
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
        for (var i = 0; i < tilesNeeded; i++) {
            if (i != hole && i != hole + 1 && i != hole + 2 && i != hole + 3) {
                this.addTile(this.game.world.width - this.tileWidth, i * this.tileHeight, true);
            }
            else {
                this.addTile(this.game.world.width - this.tileWidth, i * this.tileHeight, false);
            }
        }
    };
    Main.prototype.collideTile = function (player, tile) {
        tile.body.gravity.y = 2000;
    };
    Main.prototype.createPlayer = function () {
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
    };
    Main.prototype.createScore = function () {
        var scoreFont = "100px Arial";
        this.labelScore = this.game.add.text((this.game.world.centerX), 100, "0", { font: scoreFont, fill: "#fff" });
        this.labelScore.anchor.setTo(0.5, 0.5);
        this.labelScore.align = 'center';
    };
    Main.prototype.incrementScore = function () {
        this.score += 1;
        this.labelScore.text = this.score.toString();
    };
    Main.prototype.particleBurst = function (x, y) {
        this.emitter.x = x;
        this.emitter.y = y;
        this.emitter.start(true, 2000, null, 20);
    };
    return Main;
}(Phaser.State));
var Game = (function (_super) {
    __extends(Game, _super);
    // socket: SocketIOClient.Socket;
    function Game() {
        var _this = _super.call(this, window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio, Phaser.AUTO, 'content', null) || this;
        //Add all states
        _this.state.add('Boot', boot_1.Boot);
        _this.state.add('Preload', preload_1.Preload);
        _this.state.add('GameTitle', gametitle_1.GameTitle);
        _this.state.add('Main', Main);
        _this.state.add('GameOver', gameover_1.GameOver);
        //Start the first state
        _this.state.start('Boot');
        return _this;
    }
    return Game;
}(Phaser.Game));
//# sourceMappingURL=game.js.map

/***/ }),

/***/ 261:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/landing/landing.module": [
		831,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 261;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 305:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var firebase_1 = __webpack_require__(83);
// import { GamePage } from './../game/game';
var core_1 = __webpack_require__(1);
var ionic_angular_1 = __webpack_require__(54);
var database_1 = __webpack_require__(110);
var auth_service_1 = __webpack_require__(306);
var landing_1 = __webpack_require__(170);
var HomePage = (function () {
    function HomePage(navCtrl, db, authProvider, firebaseProvider) {
        this.navCtrl = navCtrl;
        this.authProvider = authProvider;
        this.firebaseProvider = firebaseProvider;
    }
    HomePage.prototype.signInWithFacebook = function () {
        var _this = this;
        this.authProvider.signInWithFacebook()
            .then(function () { return _this.onSignInSuccess(); });
    };
    HomePage.prototype.onSignInSuccess = function () {
        this.userProfile = this.authProvider.getUserProfile();
        this.firebaseProvider.saveUserProfile(this.userProfile);
        this.navCtrl.push(landing_1.LandingPage, { userProfile: this.userProfile });
        return this.userProfile;
    };
    return HomePage;
}());
HomePage = __decorate([
    core_1.Component({
        selector: 'page-home',template:/*ion-inline-start:"C:\Users\fifap\Desktop\mygame\src\pages\home\home.html"*/'<ion-content padding class="backgound-image home">\n\n    <ion-grid>\n\n        <ion-row>\n\n            <ion-col col-12>\n                <ion-img style="width: 250px; height: 150px; background: none !important" src="../assets/images/multyFlappyBird.png"></ion-img>\n            </ion-col>\n        </ion-row>\n\n\n\n        <ion-row>\n            <ion-col col-12>\n                <ion-img style="width: 100px; height: 100px; background: none !important" src="../assets/images/tenor.gif"></ion-img>\n            </ion-col>\n        </ion-row>\n\n\n        <ion-row>\n            <ion-col col-12>\n                <button ion-button color="dark" outline (click)="signInWithFacebook()">Signin with Facebook</button>\n            </ion-col>\n        </ion-row>\n\n    </ion-grid>\n\n\n</ion-content>'/*ion-inline-end:"C:\Users\fifap\Desktop\mygame\src\pages\home\home.html"*/,
    }),
    __metadata("design:paramtypes", [ionic_angular_1.NavController,
        database_1.AngularFireDatabase,
        auth_service_1.AuthServiceProvider,
        firebase_1.FirebaseProvider])
], HomePage);
exports.HomePage = HomePage;
//# sourceMappingURL=home.js.map

/***/ }),

/***/ 306:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var auth_1 = __webpack_require__(307);
var firebase = __webpack_require__(39);
var ionic_angular_1 = __webpack_require__(54);
var ionic_native_1 = __webpack_require__(568);
var AuthServiceProvider = (function () {
    function AuthServiceProvider(afAuth, platform) {
        var _this = this;
        this.afAuth = afAuth;
        this.platform = platform;
        this.userData = {
            uid: "",
            displayName: "",
            email: "",
            photoURL: "",
            score: 0,
        };
        afAuth.authState.subscribe(function (user) { return _this.currentUser = user; });
        platform.ready().then(function () {
            _this.af = afAuth;
        });
    }
    AuthServiceProvider.prototype.signInWithFacebook = function () {
        var _this = this;
        if (this.platform.is('cordova')) {
            return ionic_native_1.Facebook.login(['email', 'public_profile']).then(function (res) {
                var facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
                return _this.afAuth.auth.signInWithCredential(facebookCredential);
            });
        }
        else {
            return this.afAuth.auth
                .signInWithPopup(new firebase.auth.FacebookAuthProvider())
                .then(function (res) { return _this.currentUser = res; });
        }
    };
    AuthServiceProvider.prototype.signOut = function () {
        this.afAuth.auth.signOut();
    };
    AuthServiceProvider.prototype.getUserProfile = function () {
        if (this.currentUser !== null) {
            this.userData.uid = this.currentUser.user.uid;
            this.userData.displayName = this.currentUser.user.displayName;
            this.userData.email = this.currentUser.user.email;
            this.userData.photoURL = this.currentUser.user.photoURL;
            this.userData.score = 0;
            return this.userData;
        }
    };
    return AuthServiceProvider;
}());
AuthServiceProvider = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [auth_1.AngularFireAuth, ionic_angular_1.Platform])
], AuthServiceProvider);
exports.AuthServiceProvider = AuthServiceProvider;
//# sourceMappingURL=auth-service.js.map

/***/ }),

/***/ 462:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_dynamic_1 = __webpack_require__(463);
var app_module_1 = __webpack_require__(467);
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 467:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var game_1 = __webpack_require__(181);
var platform_browser_1 = __webpack_require__(48);
var core_1 = __webpack_require__(1);
var ionic_angular_1 = __webpack_require__(54);
var splash_screen_1 = __webpack_require__(301);
var status_bar_1 = __webpack_require__(304);
var app_component_1 = __webpack_require__(566);
var home_1 = __webpack_require__(305);
var landing_1 = __webpack_require__(170);
// Import the AF2 Module
var http_1 = __webpack_require__(828);
var firebase_1 = __webpack_require__(83);
var auth_service_1 = __webpack_require__(306);
var facebook_1 = __webpack_require__(829);
// import * as $ from 'jquery';
// import * as io from 'socket.io-client';
// import { HttpserviceProvider } from '../providers/httpservice/httpservice';
var angularfire2_1 = __webpack_require__(830);
var database_1 = __webpack_require__(110);
var auth_1 = __webpack_require__(307);
// AF2 Settings
exports.firebaseConfig = {
    apiKey: 'AIzaSyCVYSPaG7oAxmNJXmyE84AIR7VWivOmDdM',
    authDomain: 'multiplayer-flappybird.firebaseapp.com',
    databaseURL: 'https://multiplayer-flappybird.firebaseio.com',
    projectId: 'multiplayer-flappybird',
    storageBucket: 'multiplayer-flappybird.appspot.com',
    messagingSenderId: '49946637832',
};
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        declarations: [
            app_component_1.MyApp,
            home_1.HomePage,
            game_1.GamePage,
            landing_1.LandingPage,
        ],
        imports: [
            platform_browser_1.BrowserModule,
            ionic_angular_1.IonicModule.forRoot(app_component_1.MyApp, {}, {
                links: [
                    { loadChildren: '../pages/landing/landing.module#LandingPageModule', name: 'LandingPage', segment: 'landing', priority: 'low', defaultHistory: [] }
                ]
            }),
            http_1.HttpModule,
            database_1.AngularFireDatabaseModule,
            angularfire2_1.AngularFireModule.initializeApp(exports.firebaseConfig),
        ],
        bootstrap: [ionic_angular_1.IonicApp],
        entryComponents: [
            app_component_1.MyApp,
            home_1.HomePage,
            game_1.GamePage,
            landing_1.LandingPage
        ],
        providers: [
            status_bar_1.StatusBar,
            splash_screen_1.SplashScreen,
            { provide: core_1.ErrorHandler, useClass: ionic_angular_1.IonicErrorHandler },
            firebase_1.FirebaseProvider,
            auth_1.AngularFireAuth,
            facebook_1.Facebook,
            auth_service_1.AuthServiceProvider,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 556:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Boot = (function (_super) {
    __extends(Boot, _super);
    function Boot() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Boot.prototype.preload = function () {
    };
    Boot.prototype.create = function () {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.state.start("Preload");
    };
    return Boot;
}(Phaser.State));
exports.Boot = Boot;
//# sourceMappingURL=boot.js.map

/***/ }),

/***/ 557:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var GameOver = (function (_super) {
    __extends(GameOver, _super);
    function GameOver() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GameOver.prototype.create = function () {
    };
    GameOver.prototype.restartGame = function () {
        this.game.state.start("GameTitle");
    };
    return GameOver;
}(Phaser.State));
exports.GameOver = GameOver;
//# sourceMappingURL=gameover.js.map

/***/ }),

/***/ 558:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var GameTitle = (function (_super) {
    __extends(GameTitle, _super);
    function GameTitle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GameTitle.prototype.create = function () {
    };
    GameTitle.prototype.startGame = function () {
        this.game.state.start("Main");
    };
    return GameTitle;
}(Phaser.State));
exports.GameTitle = GameTitle;
//# sourceMappingURL=gametitle.js.map

/***/ }),

/***/ 559:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Preload = (function (_super) {
    __extends(Preload, _super);
    function Preload() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Preload.prototype.preload = function () {
        this.game.load.image('tile', '../assets/images/crate_01.png');
        this.game.load.image('tile2', '../assets/images/tile2.png');
        this.game.load.image('explode', '../assets/images/flappygifsmall.gif');
        this.game.load.image('player', '../assets/images/flappygifsmall.gif');
        this.game.load.audio('jump', '../assets/images/jump.wav');
        this.game.load.audio('hit', '../assets/images/sfx_hit.mp3');
    };
    Preload.prototype.create = function () {
        this.game.state.start("Main");
    };
    return Preload;
}(Phaser.State));
exports.Preload = Preload;
//# sourceMappingURL=preload.js.map

/***/ }),

/***/ 566:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var ionic_angular_1 = __webpack_require__(54);
var status_bar_1 = __webpack_require__(304);
var splash_screen_1 = __webpack_require__(301);
var home_1 = __webpack_require__(305);
var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = home_1.HomePage;
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    return MyApp;
}());
MyApp = __decorate([
    core_1.Component({template:/*ion-inline-start:"C:\Users\fifap\Desktop\mygame\src\app\app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"C:\Users\fifap\Desktop\mygame\src\app\app.html"*/
    }),
    __metadata("design:paramtypes", [ionic_angular_1.Platform, status_bar_1.StatusBar, splash_screen_1.SplashScreen])
], MyApp);
exports.MyApp = MyApp;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 83:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var database_1 = __webpack_require__(110);
var core_1 = __webpack_require__(1);
var FirebaseProvider = (function () {
    function FirebaseProvider(af) {
        this.af = af;
        this.userList = af.list('/Users');
    }
    FirebaseProvider.prototype.getUserlist = function () {
        this.userList = this.af.list('/Users');
        //console.log(this.userList);
        return this.userList;
    };
    FirebaseProvider.prototype.saveUserProfile = function (userProfile) {
        var ref = this.af.object('Users/' + userProfile.uid);
        return ref.set(userProfile).then(function () {
            return console.log(userProfile);
        }).catch(function (_error) {
            return _error;
        });
    };
    return FirebaseProvider;
}());
FirebaseProvider = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [database_1.AngularFireDatabase])
], FirebaseProvider);
exports.FirebaseProvider = FirebaseProvider;
//# sourceMappingURL=firebase.js.map

/***/ })

},[462]);
//# sourceMappingURL=main.js.map