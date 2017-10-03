import { FirebaseProvider } from '../../providers/firebase/firebase';

import { GamePage } from './../game/game';
import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

import * as firebase from 'firebase/app';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {


    userProfile: any

    constructor(public navCtrl: NavController,
                db: AngularFireDatabase,
                private _auth: AuthServiceProvider,
                private _firebase: FirebaseProvider)
    {

    }



    signInWithFacebook(): void {
      this._auth.signInWithFacebook()
        .then(() => this.onSignInSuccess());

    }

    onSignInSuccess() {

      this.userProfile = this._auth.getUserProfile();

      // console.log('====================================');
      // console.log(this.userProfile.user.uid);
      // console.log('====================================');
      this._firebase.saveUserProfile(this.userProfile);
      return this.userProfile;
    }

  playGame(){
    this.navCtrl.push(GamePage);
  }

}

