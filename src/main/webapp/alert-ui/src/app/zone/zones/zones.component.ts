import { Component, OnInit, ViewChild } from '@angular/core';
import {Zone} from "../zone";
import {ZoneService} from "../zone.service";
import {MatTableDataSource, MatPaginator} from "@angular/material";

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
  displayedColumns: string[] = ['name'];
  dataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  onSelect(zone: Zone): void {
    this.selectedZone = zone;
  }

  getZones(): void {
    this.zoneService.getZones()
      .subscribe(zones => {
        this.zones = zones
        this.dataSource = new MatTableDataSource(this.zones);
        this.dataSource.paginator = this.paginator;
      });

  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.zoneService.addZone({ name } as Zone)
      .subscribe(zone => {
        this.zones.push(zone);
        this.dataSource = new MatTableDataSource(this.zones);
        this.dataSource.paginator = this.paginator;
      });
  }

  delete(zone: Zone): void {
    this.zones = this.zones.filter(h => h !== zone);
    this.zoneService.deleteZone(zone).subscribe();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

}
