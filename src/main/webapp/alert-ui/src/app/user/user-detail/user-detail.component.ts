import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import {User} from "../user";
import {Zone} from "../../zone/zone";
import {UserService} from "../user.service";
import {tap} from "rxjs/operators/tap";
import {ZoneService} from "../../zone/zone.service";
import {HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
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

  createForm() {
    this.userForm = this.fb.group({
      firstname: ['', Validators.required ],
      lastname: ['', Validators.required ],
      email: ['', Validators.required ],
      phone: ['', Validators.required ]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.getUser(id).subscribe(() => {
      this.userForm.setValue({
        firstname: this.user.firstname,
        lastname: this.user.lastname,
        phone: this.user.phone,
        email: this.user.email,
      });
    });
    this.getAllZones();
    this.getUserZones(id);
  }

  getUser(id: number) {
    return this.userService.getUser(id)
      .pipe(
        tap(user => this.user = user)
      );
  }

  getAllZones(): void {
    this.zoneService.getZones()
      .subscribe(zones => this.allZones = zones);
  }

  getUserZones(id: number) {
    return this.userService.getZones(id).subscribe(zones => {
      this.userZones = zones._embedded.alertZones
    });
  }

  save(): void {
    this.userService.updateUser(this.userForm.value)
      .subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }

  onSubmit() {
    this.user = this.prepareSaveUser();
    this.userService.updateUser(this.user).subscribe();
    if(this.userZones.length) {
      this.userService.putZones(this.user, this.userZones).subscribe();
    }
  }

  prepareSaveUser(): User {
    const formModel = this.userForm.value;

    const saveUser: User = {
      id: this.user.id,
      firstname: formModel.firstname as string,
      lastname: formModel.lastname as string,
      phone: formModel.phone as string,
      email: formModel.email as string
    };
    return saveUser;
  }

  revert() { }
}
