import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


import {environment} from '../../environments/environment';
@Injectable()
export class AuthService {

  BASE_URL = environment.BASE_URL;
  private session = new BehaviorSubject<any>({});
  sessionData =  this.session.asObservable();
  
  private token = new BehaviorSubject<any>('');
  tokenRaw =  this.session.asObservable();
  

  constructor(private http: Http) { }
  
  authenticate(credentials){
     return this.http.post(this.BASE_URL+'crediantialCheck', {email: credentials.email, password: credentials.password})
                .map((response : Response) => {
                      if(response.json().data == 'No' || response.json().data == 'disabled'){
                        return null;
                      }
                      else {
                       return response.json().token;
                      }
                })
  }
  startNewUserSession(email, token){
    let headers = new Headers({Autorization : 'Bearer ' + token});
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.BASE_URL + 'getContact', {email: email}, options);
  }

  getSessionData(data){
    this.session.next(data);
  }

  getTokenData(token){
    this.token.next(token);
  }

}
