import { Component, OnInit } from '@angular/core';
import { NgSwitch } from '@angular/common';

import { UserService } from '../_services/user.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

model: any = {};
statusDropDown: Array<any> = [
  {name: 'Disponible', class: 'tex-success' },
  {name: 'Occupé(e)', class: 'text-danger'},
  {name: 'Sorti(e)', class : 'text-muted' },
  {name: 'En réunion', class : 'text-warning' }
  ];
  statusClass: string;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.model = JSON.parse(window.localStorage.getItem('data-session'));
    this.setUserStatusCssClassName();
    
  }

  changeStatus(name, css_class){
    this.userService.changeUserStatus(this.model.email, name)
                    .subscribe(response => {
                      if(response.success){
                        this.model =JSON.parse(response.data);
                        this.userService.updateSession(this.model);
                        this.model.status = name;
                        this.statusClass = css_class;

                      }
                    })
 }

 setUserStatusCssClassName(){
   switch (this.model.status) {
     case  'Disponible' :
       this.statusClass =  'text-success'; break;
     case 'Occupé(e)' :
       this.statusClass =  'text-danger'; break;
     case 'Sorti(e)' :
       this.statusClass =  'text-danger'; break;
     case 'En réunion' : 
       this.statusClass = 'text-warning'; break;
   }
 }

}
