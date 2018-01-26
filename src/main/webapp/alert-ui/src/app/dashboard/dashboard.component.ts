import { Component, OnInit } from '@angular/core';
import {ZoneService} from "../zone/zone.service";
import {Zone} from "../zone/zone";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  zones: Zone[];

  constructor(private zoneService: ZoneService) { }

  ngOnInit() {
    this.getZones();
  }

  getZones(): void {
    this.zoneService.getZones()
      .subscribe(zones => this.zones = zones);

  }

}
