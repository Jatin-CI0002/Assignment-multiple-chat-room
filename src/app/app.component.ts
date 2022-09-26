import { Component, OnInit } from '@angular/core';
import { User } from './models/user';
import { AppService } from './shared/app.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  newUser: string = '';
  users: User[] = [];

  constructor(private appService: AppService) {}

  ngOnInit() {
    this.users = this.appService.getAllUsers();
  }

  createUser() {
    if(!this.newUser) return;
    this.appService.getUser(this.newUser);
    this.users = this.appService.getAllUsers();
    this.newUser = '';
  }
}
