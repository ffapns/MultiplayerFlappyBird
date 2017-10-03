import { FirebaseObjectObservable } from 'angularfire2/database/firebase_object_observable';
import { FirebaseListObservable } from 'angularfire2/database/firebase_list_observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';




@Injectable()
export class FirebaseProvider {

  private userList: FirebaseListObservable<any>
  private shareConstant: FirebaseObjectObservable<any>


  constructor(public af: AngularFireDatabase) {
      // this.userList = af.list('/Users');

  }


  getUserlist(): any{
    this.userList = this.af.list('/Users');
    console.log(this.userList);
    return this.userList;
  }

  getShareConstant(): any{
    this.shareConstant = this.af.object('/Constant');
    console.log(this.shareConstant);
    return this.shareConstant;
  }

  saveUserProfile(userProfile:any){
    var ref = this.af.object('Users/' + userProfile.user.uid)
    var data = {
      "uid": userProfile.user.uid,
      "displayName": userProfile.user.displayName,
      "photoURL": userProfile.user.photoURL,
      "email": userProfile.user.email,
    };

    return ref.set(data).then(function () {
      return console.log(data);
    }).catch(function (_error) {
      return _error
    })
  }

}
