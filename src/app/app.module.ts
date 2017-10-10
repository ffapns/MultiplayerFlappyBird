import { GamePage } from '../pages/game/game';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

// Import the AF2 Module
import { Http, HttpModule } from '@angular/http';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { FirebaseProvider } from '../providers/firebase/firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { Facebook } from '@ionic-native/facebook';

import * as $ from 'jquery';
import * as io from 'socket.io-client';

// AF2 Settings
export const firebaseConfig = {
  apiKey: 'AIzaSyCVYSPaG7oAxmNJXmyE84AIR7VWivOmDdM',
  authDomain: 'multiplayer-flappybird.firebaseapp.com',
  databaseURL: 'https://multiplayer-flappybird.firebaseio.com',
  projectId: 'multiplayer-flappybird',
  storageBucket: 'multiplayer-flappybird.appspot.com',
  messagingSenderId: '49946637832',
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    GamePage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(firebaseConfig),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    GamePage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FirebaseProvider,
    AngularFireAuth,
    Facebook,
    AuthServiceProvider,
  ],
})

export class AppModule {}
