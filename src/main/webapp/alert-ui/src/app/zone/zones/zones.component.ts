import { Component, OnInit } from '@angular/core';
import {Zone} from "../zone";
import {ZoneService} from "../zone.service";

@Component({
  selector: 'app-zone',
  templateUrl: './zones.component.html',
  styleUrls: ['./zones.component.scss']
})
export class ZoneComponent implements OnInit {

  zones: Zone[];

  constructor(private zoneService: ZoneService) { }

  ngOnInit() {
    this.getZones();
  }

  selectedZone: Zone;

  onSelect(zone: Zone): void {
    this.selectedZone = zone;
  }

  getZones(): void {
    this.zoneService.getZones()
      .subscribe(zones => this.zones = zones);

  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.zoneService.addZone({ name } as Zone)
      .subscribe(zone => {
        this.zones.push(zone);
      });
  }

  delete(zone: Zone): void {
    this.zones = this.zones.filter(h => h !== zone);
    this.zoneService.deleteZone(zone).subscribe();
  }

}
