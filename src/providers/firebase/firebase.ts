import { FirebaseObjectObservable } from 'angularfire2/database/firebase_object_observable';
import { FirebaseListObservable } from 'angularfire2/database/firebase_list_observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';


@Injectable()
export class FirebaseProvider {

  private userList: FirebaseListObservable<any[]>

  constructor(public af: AngularFireDatabase) {
      this.userList = af.list('/Users');

  }


  getUserlist(): any{
    this.userList = this.af.list('/Users');
    //console.log(this.userList);
    return this.userList;
  }


  saveUserProfile(userProfile:any){
    var ref = this.af.object('Users/'+ userProfile.uid)

    return ref.set(userProfile).then(function () {


      return console.log(userProfile);
    }).catch(function (_error) {
      return _error
    })
  }


}
