import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";


import {Zone} from "../zone";
import {ZoneService} from "../zone.service";
import Map from 'ol/map.js';
import View from 'ol/view.js';
import TileLayer from 'ol/layer/tile.js';
import XYZ from 'ol/source/xyz.js';

@Component({
  selector: 'app-zone-detail',
  templateUrl: './zone-detail.component.html',
  styleUrls: ['./zone-detail.component.css']
})
export class ZoneDetailComponent implements OnInit {

  zone: Zone;
  map: Map;
  geom: any;

  constructor(
    private route: ActivatedRoute,
    private zoneService: ZoneService,
    private location: Location

  ) { }

  ngOnInit(): void {
    this.getZone();
    this.initMap();
  }

  getZone(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.zoneService.getZone(id)
      .subscribe(zone => this.zone = zone);
  }

  save(): void {
    this.zoneService.updateZone(this.zone)
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
        zoom: 2
      })
    });
    window['map'] = this.map;
  }

}
