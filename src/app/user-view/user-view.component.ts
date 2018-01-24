import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';

import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {

  user: User;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.getUser(id);
  }

  getUser(id): void {
    this.userService.getUser(id).subscribe(
      user => {
        this.user = user
      }
    );
  }

  deleteUser(id: string): void {
    this.userService.deleteUser(id).subscribe(
      this.router.navigate(['/users'])
    );
  }

}
