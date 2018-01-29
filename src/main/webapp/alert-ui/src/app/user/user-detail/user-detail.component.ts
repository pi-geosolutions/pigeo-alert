import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import { FormBuilder,  Validators, FormGroup } from '@angular/forms';

import {User} from "../user";
import {UserService} from "../user.service";

import Map from 'ol/map.js';
import View from 'ol/view.js';
import TileLayer from 'ol/layer/tile.js';
import XYZ from 'ol/source/xyz.js';
import {Observable} from "rxjs";
import {tap} from "rxjs/operators/tap";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  user: User;
  map: Map;
  geom: any;

  userForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private location: Location,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  createForm() {
    this.userForm = this.fb.group({
      name: ['', Validators.required ]
    });
  }

  ngOnInit(): void {
    this.getUser().subscribe(() => {
      this.userForm.setValue({
        name: this.user.name
      });
    });
    this.initMap();
  }

  getUser() {
    const id = +this.route.snapshot.paramMap.get('id');
    return this.userService.getUser(id)
      .pipe(
        tap(user => this.user = user)
      );
  }

  save(): void {
    this.userService.updateUser(this.user)
      .subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }

  private initMap(): void {
    this.map = new Map({
      layers: [
        new TileLayer({
          source: new XYZ({
            url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          })
        })
      ],
      view: new View({
        center: [0, 0],
        zoom: 2,
        minResolution: 305.748113140705
      })
    });
    window['map'] = this.map;
  }

}
