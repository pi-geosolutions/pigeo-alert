import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ZoneComponent }      from './zone/zones/zones.component';
import {ZoneDetailComponent} from "./zone/zone-detail/zone-detail.component";
import {UserComponent} from "./user/users/users.component";
import {UserDetailComponent} from "./user/user-detail/user-detail.component";
import {HomeComponent} from "./home/home.component";
import {BassinComponent} from "./bassin/bassins/bassins.component";
import {BassinDetailComponent} from "./bassin/bassin-detail/bassin-detail.component";

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'zones', component: ZoneComponent },
  { path: 'users', component: UserComponent },
  { path: 'bassins', component: BassinComponent },
  { path: 'zones/detail/:id', component: ZoneDetailComponent },
  { path: 'users/detail/:id', component: UserDetailComponent },
  { path: 'bassins/detail/:id', component: BassinDetailComponent },
  { path: 'home', component: HomeComponent }
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ]
})
export class AppRoutingModule {}
