import {Component, OnInit, IterableDiffers, ElementRef} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {FormBuilder, Validators, FormGroup, FormArray} from "@angular/forms";
import {User, UserZone} from "../user";
import {Zone} from "../../zone/zone";
import {UserService} from "../user.service";
import {tap} from "rxjs/operators/tap";
import {forkJoin} from "rxjs/observable/forkJoin";
import {ZoneService} from "../../zone/zone.service";
import {BassinService} from "../../bassin/bassin.service";
import {Bassin} from "../../bassin/bassin";
import {Observable} from "rxjs";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  user: User;
  allZones: Zone[];
  allBassins: Bassin[];
  userZones: UserZone[];
  userBassins: Bassin[];
  pristineBassins: Bassin[];
  inputZones: Zone[];
  userForm: FormGroup;
  iterableDiffer: any;
  radiusChoice: number[] = [30, 50];
  firstChangeCheck: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private location: Location,
    private fb: FormBuilder,
    private el: ElementRef,
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
      phone: ['', Validators.required ],
      zone: [''],
      fzones: this.fb.array([])
    });
  }

  get fzones(): FormArray {
    return this.userForm.get('fzones') as FormArray;
  };

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');

    this.getUser(id).subscribe(() => {
      this.userForm.reset({
        firstname: this.user.firstname,
        lastname: this.user.lastname,
        phone: this.user.phone,
        email: this.user.email,
        zone: ''
      });
    });
    setTimeout(() => {
      forkJoin(this.getAllZones(), this.getUserZones(id))
        .subscribe(() => this.updateInputZones());
    }, 100);
    this.getAllBassins();
    this.getUserBassins(id);
  }

  ngDoCheck() {
    // const zoneChange = this.userZones && this.iterableDiffer.diff(this.userZones);
    const bassinChange = this.userBassins && this.iterableDiffer.diff(this.userBassins);
    if (bassinChange) {
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

  getAllZones(): Observable<Zone[]> {
    return this.zoneService.getZones()
      .do(zones => {
        this.allZones = zones;
      });
  }

  getAllBassins(): void {
    this.bassinService.getBassins()
      .subscribe(bassins => this.allBassins = bassins);
  }

  getUserZones(id: number) {
    return this.userService.getFlatZones(id).do(zones => {
      // fix dirtyCheck if no initial zone
      this.userZones = zones;
      this.populateFzones();
    });
  }

  populateFzones() {
    const uzFGs = this.userZones.map(zone => this.fb.group({
      radius: zone.radius,
      threshold: zone.threshold,
      id: zone.zone.id,
      name: zone.zone.name
    }));
    const uzFormArray = this.fb.array(uzFGs);
    this.userForm.setControl('fzones', uzFormArray);
  }

  onFzonesChange() {
    this.userForm.markAsDirty();
    this.updateInputZones();
  }

  private updateInputZones() {
    this.inputZones = this.allZones.filter(zone => {
      return !this.fzones.value.find(z => z.id == zone.id)
    })
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

  addUserZone(zone: Zone) {
    this.fzones.push(this.fb.group({
      radius: 30,
      threshold: 10,
      id: zone.id,
      name: zone.name
    }));
    this.userForm.patchValue({
      zone: ''
    });
    this.onFzonesChange();
  }

  deleteUserZone(id: number) {
    // this.fzones.value.splice(1, this.fzones.value.findIndex(zone => zone.id === id))
    this.fzones.removeAt(this.fzones.value.findIndex(zone => zone.id === id));
    this.onFzonesChange();
  }

  goBack(): void {
    this.location.back();
  }

  onSubmit() {
    this.user = this.prepareSaveUser();
    this.userService.updateUser(this.user).subscribe(() => {
      this.userService.putZones(this.user, this.fzones).subscribe(() => {
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
    if(this.userBassins !== this.pristineBassins) {
      this.firstChangeCheck = false;
      this.userBassins = this.pristineBassins;
    }
    this.userForm.reset({
      firstname: this.user.firstname,
      lastname: this.user.lastname,
      phone: this.user.phone,
      email: this.user.email,
      zone: '',
      fzones: this.fb.array([])
    });
    this.populateFzones();
  }
}
