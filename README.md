<h1>Hybrid Application Development</h1>


<h2>Project:</h2>

<h4>Breakybird (Flappybird Cloned)</h4>

<p>The application that bring the most popular game in the past which is Flappybird to be implemented as a hybrid game application.</p>
<a>https://github.com/ffapns/MultiplayerFlappyBird/blob/master/About-MultyFlappybird.pdf</a>
<img src="https://github.com/ffapns/MultiplayerFlappyBird/blob/master/Utilities/MultyFlappyBird@2x.png">


<h2>How to install ?</h2>

1. Install Node.js

2. Install Ionic CLI
```bash
npm install -g cordova ionic
```

2. Download the project and go into the project directory with your console
```bash
git clone https://github.com/ffapns/MultiplayerFlappyBird
```

3. Install Dependencies by typing npm install in your console
```bash
npm install
```


<h4>Start the App</h4>

```bash
cd <project_directory>
then type ionic serve
```

To run it on ios:

```bash
$ ionic cordova platform add ios
$ ionic cordova run ios
```

or on android:
```bash
$ ionic cordova platform add android
$ ionic cordova run android
```



<h4>Current Features</h4>

- Login with Facebook
- Play Offline !!


<h4>Prototypes</h4>


<img src="https://github.com/ffapns/MultiplayerFlappyBird/blob/master/Utilities/Prototype.png">


<h4>Framework & API</h4>

- [Ionic 2](https://ionicframework.com) & [Cordova](https://cordova.apache.org) - The hybrid application framework
- [Firebase](https://firebase.google.com) - Used for authentication, realtime database, cloud storage and hosting
- [Phaser](http://phaser.io/) - Desktop & Mobile HTML5 Game Framework
- [AngularFire](https://github.com/angular/angularfire2) - The official library for Firebase and Angular


<h4>Software Main Architecture</h4>

<strong>Game Architecture</strong>
   <p>This is the state based</p> 
   <p>
    <ul>
        <li>Boot: The game starter</li>
         <li>Preload: Load resource into the game</li>
          <li>GameTitle: Start the game</li>
           <li>GameOver: Game end</li>
    </ul>
   </p>

<h4>What's coming next?</h4>

- Set your flappy name 
- Join the flappy game world
- Multiplayer
- Record your high scores
- Share the score to your friends

<h4>Known issues and bugs</h4>

- Ionic doesn't support for the free phaser but if you want to, you have to buy 
[IonPhaser](https://market.ionicframework.com/plugins/ionphaser).
- So, this will cause a bug when you deploy on device which you can't get into the game section.
- Support only web
- Some bugs from the Phaser framework that causes the native display problem.


<h4>Contributors</h4>
- Panusorn Srijamorn
















