import {Component, OnInit, IterableDiffers} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import {User} from "../user";
import {Zone} from "../../zone/zone";
import {UserService} from "../user.service";
import {tap} from "rxjs/operators/tap";
import {ZoneService} from "../../zone/zone.service";
import {BassinService} from "../../bassin/bassin.service";
import {Bassin} from "../../bassin/bassin";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  user: User;
  allZones: Zone[];
  allBassins: Bassin[];
  userZones: Zone[];
  userBassins: Bassin[];
  pristineBassins: Bassin[];
  pristineZones: Zone[];
  userForm: FormGroup;
  iterableDiffer: any;
  firstChangeCheck: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private location: Location,
    private fb: FormBuilder,
    private zoneService: ZoneService,
    private bassinService: BassinService,
    private iterableDiffers: IterableDiffers
  ) {
    this.iterableDiffer = this.iterableDiffers.find([]).create(null);
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
    const id = +this.route.snapshot.paramMap.get('id');

    this.getUser(id).subscribe(() => {
      this.userForm.setValue({
        firstname: this.user.firstname,
        lastname: this.user.lastname,
        phone: this.user.phone,
        email: this.user.email,
      });
    });
    this.getAllZones();
    this.getAllBassins();
    this.getUserZones(id);
    this.getUserBassins(id);
  }

  ngDoCheck() {
    let changes = this.iterableDiffer.diff(this.userZones) ||
      this.iterableDiffer.diff(this.userBassins);
    if (changes) {
      if(!this.firstChangeCheck) {
        this.firstChangeCheck = true;
        return;
      }
      this.userForm.markAsDirty();
    }
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

  getAllBassins(): void {
    this.bassinService.getBassins()
      .subscribe(bassins => this.allBassins = bassins);
  }

  getUserZones(id: number) {
    return this.userService.getZones(id).subscribe(zones => {
      // fix dirtyCheck if no initial zone
      if(!zones.length) {
        this.firstChangeCheck = true;
      }
      this.userZones = zones;
      this.pristineZones = zones;
    });
  }

  getUserBassins(id: number) {
    return this.userService.getBassins(id).subscribe(bassins => {
      // fix dirtyCheck if no initial bassin
      if(!bassins.length) {
        this.firstChangeCheck = true;
      }
      this.userBassins = bassins;
      this.pristineBassins = bassins;
    });
  }

  goBack(): void {
    this.location.back();
  }

  onSubmit() {
    this.user = this.prepareSaveUser();
    this.userService.updateUser(this.user).subscribe(() => {
      this.userService.putZones(this.user, this.userZones).subscribe(() => {
      });
      this.userService.putBassins(this.user, this.userBassins).subscribe(() => {
      });
      this.goBack();
    });
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

  delete() {
    this.userService.deleteUser(this.user).subscribe(() => this.goBack());
  }

  revert() {
    if(this.userZones !== this.pristineZones) {
      this.firstChangeCheck = false;
      this.userZones = this.pristineZones;
    }
    if(this.userBassins !== this.pristineBassins) {
      this.firstChangeCheck = false;
      this.userBassins = this.pristineBassins;
    }
    this.userForm.reset({
      firstname: this.user.firstname,
      lastname: this.user.lastname,
      phone: this.user.phone,
      email: this.user.email,
    });
  }
}
