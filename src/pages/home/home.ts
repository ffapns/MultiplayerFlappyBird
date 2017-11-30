

import { FirebaseProvider } from '../../providers/firebase/firebase';

// import { GamePage } from './../game/game';
import { Component, NgZone } from '@angular/core';
import { NavController, Platform, NavParams } from 'ionic-angular';



import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';



import { Facebook, Device } from 'ionic-native';

import {GamePage} from '../game/game';
import {LandingPage} from '../landing/landing';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})

export class HomePage {

    private userProfile: any;

    constructor(public navCtrl: NavController,
      db: AngularFireDatabase,
      private authProvider: AuthServiceProvider,
      private firebaseProvider: FirebaseProvider)
    {

    }



    private signInWithFacebook(): void {
      this.authProvider.signInWithFacebook()
        .then(() => this.onSignInSuccess());

    }

    private onSignInSuccess() {
      this.userProfile = this.authProvider.getUserProfile();
      this.firebaseProvider.saveUserProfile(this.userProfile);
      this.navCtrl.push(LandingPage, {userProfile: this.userProfile});
      return this.userProfile;
    }

    play(){
      this.navCtrl.push(GamePage);
    }

}
