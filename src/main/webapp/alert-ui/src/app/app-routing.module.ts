import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ZoneComponent }      from './zone/zones/zones.component';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {ZoneDetailComponent} from "./zone/zone-detail/zone-detail.component";

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'zones', component: ZoneComponent },
  { path: 'detail/:id', component: ZoneDetailComponent },
  { path: 'dashboard', component: DashboardComponent }
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ]
})
export class AppRoutingModule {}
