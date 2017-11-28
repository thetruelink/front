import { Component, OnInit } from '@angular/core';

import { AuthService } from './_services/authentication.service';
import { NavbarService } from './_services/navbar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  hasSession: boolean = false;
  navbarVisble: boolean ;
  isHeaderVisible: boolean ;

  constructor(private authService: AuthService, private navbarService: NavbarService){}
  ngOnInit(){
    this.hasSession = window.localStorage.getItem('api-token') ? true: false;
   
    //this.authService.tokenRaw.subscribe(data => {console.log(data)});
    this.navbarVisble = this.navbarService.isNavbarVisible();

    this.isHeaderVisible = !this.navbarVisble; //(this.hasSession && !this.navbarVisble);

  }
}
