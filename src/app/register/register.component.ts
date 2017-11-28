import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { NavbarService } from '../_services/navbar.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  firstName = new FormControl('');
  lastName = new FormControl('');
  email    = new FormControl('');
  password = new FormControl('');
  confirmation = new FormControl('');

  registerForm: FormGroup = this.builder.group({
    first_name: this.firstName,
    last_name: this.lastName,
    email: this.email,
    password: this.password,
    confirmation: this.confirmation
  });




  constructor(private builder: FormBuilder, navbarService: NavbarService) { }

  ngOnInit() {
  }

}
