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
import {tap} from "rxjs/operators/tap";
import {FeatureOverlayService} from "../../ngeo/feature-overlay/feature-overlay.service";
import VectorLayer from 'ol/layer/vector.js'
import { point } from '@turf/helpers';
import buffer from '@turf/buffer';
import GeoJSON from 'ol/format/geojson.js';
import Fill from 'ol/style/fill';
import Stroke from 'ol/style/stroke';
import Style from 'ol/style/style';

@Component({
  selector: 'app-zone-detail',
  templateUrl: './zone-detail.component.html',
  styleUrls: ['./zone-detail.component.scss']
})
export class ZoneDetailComponent implements OnInit {

  zone: Zone;
  map: Map;
  geom: any;
  private featureOverlay: VectorLayer;

  zoneForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private zoneService: ZoneService,
    private foService: FeatureOverlayService,
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
        zoom: 2
        // minResolution: 305.748113140705
      })
    });
    this.featureOverlay = this.foService.getFeatureOverlay(this.map);
  }

  private getBufferStyle(color: string) : Style {
    return new Style({
      fill: new Fill({
        color: `rgba(${color},0.5)`
      }),
      stroke: new Stroke({
        color: `rgba(${color},1)`,
        width: 2
      })
    });
  }

  outputChange(geom) {
    if(geom) {
      const p = point(geom.coordinates);
      const format = new GeoJSON();
      let feature;

      [
        {radius: 50, style: '122,255,122'},
        {radius: 30, style:'255,122,122'}
      ].forEach(conf => {
        let buffered = buffer(p, conf.radius, {steps: 128});
        feature = format.readFeature(buffered, {
          dataProjection: 'EPSG:4326',
          featureProjection: this.map.getView().getProjection()
        });
        feature.setStyle(this.getBufferStyle(conf.style));
        this.featureOverlay.getSource().addFeature(feature);
      });

      const view = this.map.getView();
      view.fit(feature.getGeometry().getExtent());
      view.setZoom(view.getZoom() - 1);
    }

  }
}
