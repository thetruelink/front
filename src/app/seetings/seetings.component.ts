import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { UserService } from '../_services/user.service'; 
@Component({
  selector: 'app-seetings',
  templateUrl: './seetings.component.html',
  styleUrls: ['./seetings.component.css']
})
export class SeetingsComponent implements OnInit {


  user: any;
  changePasswordSeetings: boolean = false;
  pwd: any = {};
  //@Input() appConfirm = () => {}

  constructor(private userService:UserService, private router: Router) { }


  ngOnInit() {
    this.user = JSON.parse(window.localStorage.getItem('data-session'));
  }
  changePasswordAction(){
    this.userService.changePassword(this.pwd, this.user.email)
    .subscribe(response => {
      console.log(response);
    })
     
  }

  cancelChangePasswordAction(){
    //if(!this.changePasswordSeetings)
       //this.router.navigate(['/']);
  }
  

}
