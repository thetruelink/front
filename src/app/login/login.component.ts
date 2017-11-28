import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../_services/authentication.service';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  emailFormControl = new FormControl('', (
    Validators.required,
    Validators.pattern(EMAIL_REGEX)
  ));

  //credentials: any = {};

  email = new FormControl('');
  password = new FormControl('');

  loginForm: FormGroup = this.builder.group({
    email : this.email,
    password : this.password
  });


  constructor(private authService: AuthService, 
              private router: Router, private builder: FormBuilder) { }

  ngOnInit() {
  }

  login(){
    let credentials = this.loginForm.value;
    this.authService.authenticate(credentials).subscribe(token => {
          if(token){
            this.authService.startNewUserSession(credentials.email, token)
                .subscribe(response => {
                  //this.authService.getSessionData(response.json());
                  this.authService.getTokenData({'token': token});
                  window.localStorage.setItem('data-session', response.json());
                  window.localStorage.setItem('api-token', token);
                  
                  this.router.navigate(['home']);
                },
                err => {
                console.log(err)
              })
          }
    })
  }
}
