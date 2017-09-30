import { GamePage } from './../game/game';
import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  playGame(){
    this.navCtrl.push(GamePage);
  }

}

