import { Component, OnInit } from '@angular/core';
import {User} from "../user";
import {UserService} from "../user.service";

@Component({
  selector: 'app-user',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UserComponent implements OnInit {

  users: User[];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUsers();
  }

  selectedUser: User;

  onSelect(user: User): void {
    this.selectedUser = user;
  }

  getUsers(): void {
    this.userService.getUsers()
      .subscribe(users => this.users = users);

  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.userService.addUser({ name } as User)
      .subscribe(user => {
        this.users.push(user);
      });
  }

  delete(user: User): void {
    this.users = this.users.filter(h => h !== user);
    this.userService.deleteUser(user).subscribe();
  }

}
