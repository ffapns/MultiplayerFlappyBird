import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { Platform } from 'ionic-angular';
import { Facebook } from 'ionic-native';

@Injectable()
export class AuthServiceProvider {

    private currentUser: any;


    userData = {
      user: {
        uid: "",
        displayName: "",
        email: "",
        photoURL: "",
      },
    };

    constructor(public afAuth: AngularFireAuth, public platform: Platform) {
      afAuth.authState.subscribe((user: firebase.User) => this.currentUser = user);
    }

    get authenticated(): boolean {
      return this.currentUser !== null;
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
        this.userData.user.uid = this.currentUser.user.uid;
        this.userData.user.displayName = this.currentUser.user.displayName;
        this.userData.user.email = this.currentUser.user.email;
        this.userData.user.photoURL = this.currentUser.user.photoURL;

        return this.userData;
      }

    }



}
