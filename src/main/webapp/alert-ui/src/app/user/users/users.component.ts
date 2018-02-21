import { Component, OnInit, ViewChild } from '@angular/core';
import {User} from "../user";
import {UserService} from "../user.service";
import {MatTableDataSource, MatPaginator} from "@angular/material";

@Component({
  selector: 'app-user',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UserComponent implements OnInit {

  users: User[];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUsers();
  }

  selectedUser: User;
  displayedColumns: string[] = ['firstname', 'lastname', 'email', 'phone'];
  dataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  onSelect(user: User): void {
    this.selectedUser = user;
  }

  getUsers(): void {
    this.userService.getUsers()
      .subscribe(users => {
        this.users = users;
        this.dataSource = new MatTableDataSource(this.users);
        this.dataSource.paginator = this.paginator;
      });
  }

  add(lastname: string): void {
    lastname = lastname.trim();
    if (!lastname) { return; }
    this.userService.addUser({ lastname } as User)
      .subscribe(user => {
        this.users.push(user);
        this.dataSource = new MatTableDataSource(this.users);
        this.dataSource.paginator = this.paginator;
      });
  }

  delete(user: User): void {
    this.users = this.users.filter(h => h !== user);
    this.userService.deleteUser(user).subscribe();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
}
