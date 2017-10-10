
import { FirebaseProvider } from '../../providers/firebase/firebase';

import { GamePage } from './../game/game';
import { Component, NgZone } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Http } from "@angular/http";


import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

import * as firebase from 'firebase/app';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})

export class HomePage {

    private userProfile: any;


    constructor(public navCtrl: NavController,
      db: AngularFireDatabase,
      private auth: AuthServiceProvider,
      private firebaseProvider: FirebaseProvider)
    {

    }



    // private signInWithFacebook(): void {
    //   this._auth.signInWithFacebook()
    //     .then(() => this.onSignInSuccess());

    // }

    // private onSignInSuccess() {

    //   this.userProfile = this._auth.getUserProfile();

    //   // console.log('====================================');
    //   // console.log(this.userProfile.user.uid);
    //   // console.log('====================================');
    //   this._firebase.saveUserProfile(this.userProfile);
    //   return this.userProfile;
    // }

  private playGame(): void {

    this.navCtrl.push(GamePage);
  }



}
