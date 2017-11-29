import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GamePage} from '../game/game';


import { FirebaseProvider } from '../../providers/firebase/firebase';


@IonicPage()
@Component({
  selector: 'page-landing',
  templateUrl: 'landing.html',
})
export class LandingPage {

  userProfile:any;

  constructor(public navCtrl: NavController,
    private firebaseProvider: FirebaseProvider,
    param:NavParams)
  {
    this.userProfile = param.get("userProfile");
    console.log(this.userProfile);
  }

  private StartGame(): void {
    this.navCtrl.push(GamePage);
  }

  logout(){
    this.navCtrl.popToRoot();
  }


}
