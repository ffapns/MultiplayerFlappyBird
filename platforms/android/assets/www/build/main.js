webpackJsonp([0],{

/***/ 177:
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
webpackEmptyAsyncContext.id = 177;

/***/ }),

/***/ 178:
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
const core_1 = __webpack_require__(1);
const ionic_angular_1 = __webpack_require__(64);
/**
 * Generated class for the GamePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
let GamePage = class GamePage {
    constructor(navCtrl) {
        this.navCtrl = navCtrl;
    }
    ionViewDidLoad() {
        var myGame = new Game();
    }
};
GamePage = __decorate([
    core_1.Component({
        selector: 'page-game',template:/*ion-inline-start:"C:\Users\fifap\Desktop\ABAC YEAR 4\1-2017\HybridAppProject\MultiPlayerFlappybird\mygame\src\pages\game\game.html"*/'<ion-content>\n    <div id="content"></div>\n</ion-content>'/*ion-inline-end:"C:\Users\fifap\Desktop\ABAC YEAR 4\1-2017\HybridAppProject\MultiPlayerFlappybird\mygame\src\pages\game\game.html"*/,
    }),
    __metadata("design:paramtypes", [ionic_angular_1.NavController])
], GamePage);
exports.GamePage = GamePage;
class FlappyBird extends Phaser.State {
    preload() {
        // Change the background color of the game
        this.game.stage.backgroundColor = '#71c5cf';
        // Load the bird sprite
        this.game.load.image('bird', '../assets/images/flappygifsmall.gif');
        this.game.load.image('pipe', '../assets/images/pipe-up.png');
        this.game.load.image('ground', '../assets/images/land.png');
        this.game.load.audio('jump', '../assets/images/jump.wav');
        this.game.load.audio('hit', '../assets/images/sfx_hit.wav');
    }
    create() {
        // Set the physics system
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        // Display the bird on the screen
        this.bird = this.game.add.sprite(100, 245, 'bird');
        // Add gravity to the bird to make it fall
        this.game.physics.arcade.enable(this.bird);
        this.bird.body.gravity.y = 1000;
        this.bird.anchor.setTo(-0.2, 0.5);
        // Call the 'jump' function when the spacekey is hit
        var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.jump, this);
        this.pipes = this.game.add.group();
        this.pipes.enableBody = true;
        this.pipes.createMultiple(100, 'pipe');
        this.timer = this.game.time.events.loop(1500, this.addRowOfPipes, this);
        this.score = 0;
        this.labelScore = this.game.add.text(20, 20, "0", { font: "30px Arial", fill: "#ffffff" });
        this.stateText = this.game.add.text(this.game.world.centerX, this.game.world.centerY, ' ', { font: '30px Arial', fill: '#fff' });
        this.stateText.anchor.setTo(0.5, 0.5);
        this.stateText.visible = false;
        this.platforms = this.game.add.group();
        this.platforms.enableBody = true;
        var ground = this.platforms.create(0, this.game.world.height - 200, 'ground');
        //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
        ground.scale.setTo(2, 2);
        //  This stops it from falling away when you jump on it
        ground.body.immovable = true;
        //  Now let's create two ledges
        this.jumpSound = this.game.add.audio('jump');
        this.hitSound = this.game.add.audio('hit');
    }
    update() {
        // If the bird is out of the world (too high or too low), call the 'restartGame' function
        if (this.bird.inWorld == false) {
            this.stateText.text = " GAME OVER \n Click to restart";
            this.stateText.visible = true;
            //the "click to restart" handler
            this.game.input.onTap.addOnce(this.restartGame, this);
        }
        this.game.physics.arcade.overlap(this.bird, this.pipes, this.hitPipe, null, this);
        if (this.bird.angle < 20)
            this.bird.angle += 1;
    }
    jump() {
        if (this.bird.alive == false)
            return;
        this.bird.body.velocity.y = -350;
        this.game.add.tween(this.bird).to({ angle: -20 }, 100).start();
        this.jumpSound.play();
    }
    restartGame() {
        // Start the 'main' state, which restarts the game
        this.game.state.start('Main');
    }
    addOnePipe(x, y) {
        var pipe = this.pipes.getFirstDead();
        pipe.reset(x, y);
        pipe.body.velocity.x = -200;
        pipe.checkWorldBounds = true;
        pipe.outOfBoundsKill = true;
    }
    addRowOfPipes() {
        var hole = Math.floor(Math.random() * 5) + 1;
        for (var i = 0; i < 9; i++)
            if (i != hole && i != hole + 1)
                this.addOnePipe(400, i * 60 + 10);
        this.score += 1;
        this.labelScore.text = this.score.toString();
    }
    hitPipe() {
        if (this.bird.alive == false)
            return;
        this.bird.alive = false;
        this.hitSound.play();
        this.game.time.events.remove(this.timer);
        this.pipes.forEachAlive((p) => {
            p.body.velocity.x = 0;
        }, this);
    }
}
class Game extends Phaser.Game {
    constructor() {
        super(900, 768, Phaser.AUTO, 'content', null);
        this.state.add('Main', FlappyBird, false);
        this.state.start('Main');
    }
}
//# sourceMappingURL=game.js.map

/***/ }),

/***/ 221:
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
webpackEmptyAsyncContext.id = 221;

/***/ }),

/***/ 265:
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
const game_1 = __webpack_require__(178);
const core_1 = __webpack_require__(1);
const ionic_angular_1 = __webpack_require__(64);
const database_1 = __webpack_require__(266);
const auth_service_1 = __webpack_require__(304);
let HomePage = class HomePage {
    constructor(navCtrl, db, _auth) {
        this.navCtrl = navCtrl;
        this._auth = _auth;
        this.items = db.list('/items');
    }
    signInWithFacebook() {
        this._auth.signInWithFacebook()
            .then(() => this.onSignInSuccess());
    }
    onSignInSuccess() {
        console.log("Facebook display name ", this._auth.displayName());
    }
    playGame() {
        this.navCtrl.push(game_1.GamePage);
    }
};
HomePage = __decorate([
    core_1.Component({
        selector: 'page-home',template:/*ion-inline-start:"C:\Users\fifap\Desktop\ABAC YEAR 4\1-2017\HybridAppProject\MultiPlayerFlappybird\mygame\src\pages\home\home.html"*/'<ion-content padding class="backgound-image home">\n    <!-- <h1>Multiplayer FlappyBird</h1>\n    <ion-item>\n        <ion-input class="play-btn" type="text" placeholder="Player Name"></ion-input>\n    </ion-item> -->\n\n    <ion-grid>\n        <ion-row>\n            <ion-col col-12>\n                <img class="flappyico" src="../assets/images/flappy-bird-logo.png">\n            </ion-col>\n        </ion-row>\n        <ion-row>\n            <ion-col col-12>\n                <img class="flappyico" src="../assets/images/flappygif.gif">\n            </ion-col>\n        </ion-row>\n        <ion-row>\n            <ion-col col-12>\n                <ion-list>\n                    <ion-item class="text" *ngFor="let item of items | async">\n                        {{item | json}}\n                    </ion-item>\n                </ion-list>\n            </ion-col>\n        </ion-row>\n        <ion-row>\n            <ion-col col-12>\n                <button ion-button outline (click)="signInWithFacebook()">Facebook</button>\n                <!-- <button ion-button color="dark" (click)="playGame()">Play</button> -->\n            </ion-col>\n        </ion-row>\n\n    </ion-grid>\n\n\n</ion-content>'/*ion-inline-end:"C:\Users\fifap\Desktop\ABAC YEAR 4\1-2017\HybridAppProject\MultiPlayerFlappybird\mygame\src\pages\home\home.html"*/
    }),
    __metadata("design:paramtypes", [ionic_angular_1.NavController, database_1.AngularFireDatabase, auth_service_1.AuthServiceProvider])
], HomePage);
exports.HomePage = HomePage;
//# sourceMappingURL=home.js.map

/***/ }),

/***/ 304:
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
const core_1 = __webpack_require__(1);
const auth_1 = __webpack_require__(305);
const firebase = __webpack_require__(41);
const ionic_angular_1 = __webpack_require__(64);
const ionic_native_1 = __webpack_require__(563);
let AuthServiceProvider = class AuthServiceProvider {
    constructor(afAuth, platform) {
        this.afAuth = afAuth;
        this.platform = platform;
        afAuth.authState.subscribe((user) => this.currentUser = user);
    }
    get authenticated() {
        return this.currentUser !== null;
    }
    signInWithFacebook() {
        if (this.platform.is('cordova')) {
            return ionic_native_1.Facebook.login(['email', 'public_profile']).then(res => {
                const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
                return this.afAuth.auth.signInWithCredential(facebookCredential);
            });
        }
        else {
            return this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
        }
    }
    signOut() {
        this.afAuth.auth.signOut();
    }
    displayName() {
        if (this.currentUser !== null) {
            return this.currentUser.displayName;
        }
        else {
            return '';
        }
    }
};
AuthServiceProvider = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_1.AngularFireAuth !== "undefined" && auth_1.AngularFireAuth) === "function" && _a || Object, typeof (_b = typeof ionic_angular_1.Platform !== "undefined" && ionic_angular_1.Platform) === "function" && _b || Object])
], AuthServiceProvider);
exports.AuthServiceProvider = AuthServiceProvider;
var _a, _b;
//# sourceMappingURL=auth-service.js.map

/***/ }),

/***/ 462:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const platform_browser_dynamic_1 = __webpack_require__(463);
const app_module_1 = __webpack_require__(467);
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
const game_1 = __webpack_require__(178);
const platform_browser_1 = __webpack_require__(48);
const core_1 = __webpack_require__(1);
const ionic_angular_1 = __webpack_require__(64);
const splash_screen_1 = __webpack_require__(261);
const status_bar_1 = __webpack_require__(264);
const facebook_1 = __webpack_require__(510);
const app_component_1 = __webpack_require__(511);
const home_1 = __webpack_require__(265);
// Import the AF2 Module
const http_1 = __webpack_require__(461);
const database_1 = __webpack_require__(266);
const angularfire2_1 = __webpack_require__(823);
const firebase_1 = __webpack_require__(824);
const auth_1 = __webpack_require__(305);
const auth_service_1 = __webpack_require__(304);
// AF2 Settings
exports.firebaseConfig = {
    apiKey: "AIzaSyDnAX0CQbbsMYuOTJ66ox_F0GwzPM4XPXY",
    authDomain: "angularfire2-list-example.firebaseapp.com",
    databaseURL: "https://angularfire2-list-example.firebaseio.com",
    storageBucket: "",
    messagingSenderId: "609067141823"
};
let AppModule = class AppModule {
};
AppModule = __decorate([
    core_1.NgModule({
        declarations: [
            app_component_1.MyApp,
            home_1.HomePage,
            game_1.GamePage
        ],
        imports: [
            platform_browser_1.BrowserModule,
            ionic_angular_1.IonicModule.forRoot(app_component_1.MyApp),
            http_1.HttpModule,
            database_1.AngularFireDatabaseModule,
            angularfire2_1.AngularFireModule.initializeApp(exports.firebaseConfig)
        ],
        bootstrap: [ionic_angular_1.IonicApp],
        entryComponents: [
            app_component_1.MyApp,
            home_1.HomePage,
            game_1.GamePage,
        ],
        providers: [
            status_bar_1.StatusBar,
            splash_screen_1.SplashScreen,
            { provide: core_1.ErrorHandler, useClass: ionic_angular_1.IonicErrorHandler },
            firebase_1.FirebaseProvider,
            auth_1.AngularFireAuth,
            facebook_1.Facebook,
            auth_service_1.AuthServiceProvider
        ]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 511:
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
const core_1 = __webpack_require__(1);
const ionic_angular_1 = __webpack_require__(64);
const status_bar_1 = __webpack_require__(264);
const splash_screen_1 = __webpack_require__(261);
const home_1 = __webpack_require__(265);
let MyApp = class MyApp {
    constructor(platform, statusBar, splashScreen) {
        this.rootPage = home_1.HomePage;
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
};
MyApp = __decorate([
    core_1.Component({template:/*ion-inline-start:"C:\Users\fifap\Desktop\ABAC YEAR 4\1-2017\HybridAppProject\MultiPlayerFlappybird\mygame\src\app\app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"C:\Users\fifap\Desktop\ABAC YEAR 4\1-2017\HybridAppProject\MultiPlayerFlappybird\mygame\src\app\app.html"*/
    }),
    __metadata("design:paramtypes", [ionic_angular_1.Platform, status_bar_1.StatusBar, splash_screen_1.SplashScreen])
], MyApp);
exports.MyApp = MyApp;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 824:
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
const core_1 = __webpack_require__(1);
const http_1 = __webpack_require__(461);
__webpack_require__(164);
/*
  Generated class for the FirebaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
let FirebaseProvider = class FirebaseProvider {
    constructor(http) {
        this.http = http;
        console.log('Hello FirebaseProvider Provider');
    }
};
FirebaseProvider = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], FirebaseProvider);
exports.FirebaseProvider = FirebaseProvider;
//# sourceMappingURL=firebase.js.map

/***/ })

},[462]);
//# sourceMappingURL=main.js.map