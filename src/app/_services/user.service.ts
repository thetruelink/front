import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


import {environment} from '../../environments/environment';

@Injectable()
export class UserService {
  BASE_URL = environment.BASE_URL;
  http_options:any;
  private chatDestination = new BehaviorSubject<any>({});
  destination =  this.chatDestination.asObservable();

  constructor(private http: Http) {
    let headers = new Headers({Autorization : 'Bearer ' + window.localStorage.getItem('api-token')});
    this.http_options = new RequestOptions({ headers: headers });
   
   }


  getAllUsers(){
   
    return this.http.get(this.BASE_URL+ 'allContacts',this.http_options)
                .map((response: Response) =>{
                   return response.json();
                })

  }

  changeUserStatus(email, new_status){
    return this.http.post(this.BASE_URL + 'changeStatus', {email: email, status: new_status}, this.http_options)
              .map((response: Response) => {
                return response.json();
              });

  }
  updateSession(model){
    window.localStorage.setItem('data-session',JSON.stringify(model)); 
  }

  getFavoritesContacts(email){
    return this.http.post(this.BASE_URL + 'listeContact', {email: email} , this.http_options)
                .map((response: Response) => {
                  return response.json();
                });
  }

  addContactAsFavory(user_id, favory_id){
    return this.http.post(this.BASE_URL + 'addContact', {userId: user_id, destId: favory_id})
               .map((response: Response) => {
                 return response.json();
               });
  }

  removeContactToFavorite(user_id, favory_id){
    return this.http.post(this.BASE_URL + 'removeContact', {userId: user_id, destId: favory_id})
               .map((response: Response) => {
                 return response.json();
               });
  }

  getDestinationContact(data){
    this.chatDestination.next(data);
  }

  getTemplateOutlet(){
    return this.http.get('../chat/chat.component.html');
  }

  changePassword(pwd, email){
    return this.http.post(this.BASE_URL + 'change-password', {password: pwd.password, 
          _password: pwd._password, email: email})
            .map((response: Response) => {
              return response.json();
            })
  }






}
