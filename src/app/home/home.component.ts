import { Component, OnInit } from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import { NgSwitch, NgClass,NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';

import { AuthService } from '../_services/authentication.service';
import { UserService } from '../_services/user.service';
//import { RbmqService } from '../_services/rbmq.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  model: any = {};
  statusDropDown: Array<any> = [
    {name: 'Disponible', class: 'tex-success' },
    {name: 'Occupé(e)', class: 'text-danger'},
    {name: 'Sorti(e)', class : 'text-muted' },
    {name: 'En réunion', class : 'text-warning' }
    ];
    statusClass: string;
    public contacts: Array<any> = [];
    public favorites: Array<any>= [];
    public columns:Array<any> = [
      {title: '', name: 'prenom'},
      {title: '', name: 'nom'},
    ];
    public config:any = {
      paging: false,
      className: ['table-striped', 'table-bordered']
    };

    instantChat: boolean = false;
    templateOutlet: any;
    conversationList : Array<any> = [];

    
  constructor(private authService: AuthService, private userService: UserService) { }
  
  ngOnInit() {
    /*this.authService.sessionData.subscribe(data => { 
      console.log (JSON.parse(data));
      this.model = JSON.parse(data);
    })
    */
   this.model = JSON.parse(window.localStorage.getItem('data-session'));
   this.userService.getAllUsers().subscribe(data => {
     this.contacts = data.filter(element => {
        return element.id != this.model.id;
       
     });
   });

   this.userService.getFavoritesContacts(this.model.email)
                   .subscribe(response => {
                          if(response.success){
                            this.favorites = JSON.parse(response.data);
                            console.log(this.favorites);
                          }
                   });

    //this.userService.getTemplateOutlet()
      //  .subscribe(html => {console.log(html)});
      this.templateOutlet = '../chat/chat.component.html';

      //this.rmbqService.getMessage();

  }


  addToFavorites(contact){
      let is_favory = this.favorites.filter(f => { return f.id == contact.id }).length ==0 ? false : true;
      if(!is_favory){
        this.userService.addContactAsFavory(this.model.id, contact.id)
        .subscribe(data => {
          if(data.success){
            this.favorites.push(contact);
          }
        })
      }
  }

  deleteToFavorites(contact){
    this.userService.removeContactToFavorite(this.model.id, contact.id)
                    .subscribe(data => {
                      if(data.success){
                        this.favorites.splice(this.favorites.indexOf(contact), 1);
                      }
                    });
  }

  loadConversation(contact){ 
    this.setConversation(contact);
  }
  
  setConversation(contact){
    this.conversationList.push(contact);
  }

  startNewConversation(contact):boolean{
    return this.conversationList.filter(c => { return c.id == contact.id}).length == 0 ? false : true;
  }


}

