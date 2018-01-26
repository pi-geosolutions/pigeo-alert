import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import { FormBuilder,  Validators, FormGroup } from '@angular/forms';

import {Zone} from "../zone";
import {ZoneService} from "../zone.service";

import Map from 'ol/map.js';
import View from 'ol/view.js';
import TileLayer from 'ol/layer/tile.js';
import XYZ from 'ol/source/xyz.js';
import {Observable} from "rxjs";
import {tap} from "rxjs/operators/tap";

@Component({
  selector: 'app-zone-detail',
  templateUrl: './zone-detail.component.html',
  styleUrls: ['./zone-detail.component.css']
})
export class ZoneDetailComponent implements OnInit {

  zone: Zone;
  map: Map;
  geom: any;

  zoneForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private zoneService: ZoneService,
    private location: Location,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  createForm() {
    this.zoneForm = this.fb.group({
      name: ['', Validators.required ]
    });
  }

  ngOnInit(): void {
    this.getZone().subscribe(() => {
      this.zoneForm.setValue({
        name: this.zone.name
      });
    });
    this.initMap();
  }

  getZone() {
    const id = +this.route.snapshot.paramMap.get('id');
    return this.zoneService.getZone(id)
      .pipe(
        tap(zone => this.zone = zone)
      );
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
        zoom: 2,
        minResolution: 305.748113140705
      })
    });
    window['map'] = this.map;
  }

}
