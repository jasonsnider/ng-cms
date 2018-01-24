import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Router} from "@angular/router";

import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {

  user = new User();

  errors = [
    'message':'';
  ];

  constructor(
    private userService: UserService,
    private router: Router

  ) { }

  ngOnInit(): void{}

  response(response): void{
    if(response.success===false){
      this.errors = response.errors.errors;
      this.errors.message = response.errors.message;
      this.errors._message = response.errors._message;
    }

    if(response.success===true){
      this.router.navigate(['/users/view/', response.user._id]);
    }
  }

  onSubmit(): void {
    this.userService.createUser(this.user).subscribe(
      (response) => {this.response(response)}
    );
  }

}
