import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import { FormBuilder,  Validators, FormGroup } from '@angular/forms';

import {User} from "../user";
import {UserService} from "../user.service";

import {tap} from "rxjs/operators/tap";
import {ZoneService} from "../../zone/zone.service";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  user: User;
  allZones: Zone[];
  userZones: Zone[] = [];

  userForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private location: Location,
    private fb: FormBuilder,
    private zoneService: ZoneService
  ) {
    this.createForm();
  }
  itemsAsObjects = [{value: 0, display: 'Angular'}, {value: 1, display: 'React'}];

  createForm() {
    this.userForm = this.fb.group({
      firstname: ['', Validators.required ],
      lastname: ['', Validators.required ],
      phone: ['', Validators.required ]
    });
  }

  ngOnInit(): void {
    this.getUser().subscribe(() => {
      this.userForm.setValue({
        firstname: this.user.firstname,
        lastname: this.user.lastname,
        phone: this.user.phone,
      });
    });
    this.getZones();
  }

  getUser() {
    const id = +this.route.snapshot.paramMap.get('id');
    return this.userService.getUser(id)
      .pipe(
        tap(user => this.user = user)
      );
  }

  getZones(): void {
    return this.zoneService.getZones()
      .subscribe(zones => this.allZones = zones);

  }

  save(): void {
    this.userService.updateUser(this.user)
      .subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }

}
