import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the HttpserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpserviceProvider {

  private URL = 'https://api.ipify.org?format=json';
  constructor(public http: Http) {
    console.log('Hello HttpserviceProvider Provider');
  }

  getUserIp() {
    return this.http.get(this.URL).map(res => res.json());
  }

}
