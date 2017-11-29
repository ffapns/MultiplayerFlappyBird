import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { Platform } from 'ionic-angular';
import { Facebook } from 'ionic-native';

@Injectable()
export class AuthServiceProvider {

    private currentUser: any;

    af:any;
    userData = {
      uid: "",
      displayName: "",
      email: "",
      photoURL: "",
      score: 0,
    };

    constructor(public afAuth: AngularFireAuth, public platform: Platform) {
      afAuth.authState.subscribe((user: firebase.User) => this.currentUser = user);
      platform.ready().then(() => {
        this.af = afAuth;
      });
    }

    signInWithFacebook(): firebase.Promise<any> {
      if (this.platform.is('cordova')) {
        return Facebook.login(['email', 'public_profile']).then(res => {
          const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
          return this.afAuth.auth.signInWithCredential(facebookCredential);
        });
      } else {
        return this.afAuth.auth
        .signInWithPopup(new firebase.auth.FacebookAuthProvider())
        .then(res => this.currentUser = res);
      }

    }

    signOut(): void {
      this.afAuth.auth.signOut();
    }

    getUserProfile(): any {

      if (this.currentUser !== null) {
        this.userData.uid = this.currentUser.user.uid;
        this.userData.displayName = this.currentUser.user.displayName;
        this.userData.email = this.currentUser.user.email;
        this.userData.photoURL = this.currentUser.user.photoURL;
        this.userData.score = 0;

        return this.userData;
      }

    }



}
