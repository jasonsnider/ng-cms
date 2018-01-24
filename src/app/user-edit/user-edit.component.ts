import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';

import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: [
    '../app.component.scss',
    './user-edit.component.scss'
  ]
})
export class UserEditComponent implements OnInit {

  user: User;

  errors = [
    'message':'';
  ];

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router

  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.getUser(id);
  }

  getUser(id): void {
    this.userService.getUser(id).subscribe(
      user => {
        this.user = user.user
      }
    );
  }

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
    this.userService.editUser(this.user).subscribe(
      (response) => {this.response(response)}
    );
  }

}
