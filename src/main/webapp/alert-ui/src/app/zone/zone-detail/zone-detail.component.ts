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
import Feature from 'ol/feature.js';
import {GeometryService} from "../../ngeo/geom/geometry.service";
import TileWMS from "ol/source/tilewms.js";

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
  firstChangeCheck: boolean = false;
  private pristineGeom: any;

  zoneForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private zoneService: ZoneService,
    private foService: FeatureOverlayService,
    private geomService: GeometryService,
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
        tap(zone => {
          this.zone = zone;
          this.pristineGeom = zone.geom;
          if(!zone.geom) {
            this.firstChangeCheck = true;
          }
        })
      );
  }

  goBack(): void {
    this.location.back();
  }

  onSubmit() {
    this.zone = this.prepareSaveZone();
    this.zoneService.updateZone(this.zone)
      .subscribe(() => this.goBack());
  }

  prepareSaveZone(): Zone {
    const formModel = this.zoneForm.value;

    const saveZone: Zone = {
      id: this.zone.id,
      geom: null,
      name: formModel.name as string
    };
    if (this.zone.geom) {
      saveZone.geom = this.zone.geom;
    }
    return saveZone;
  }

  revert() {
    this.zone.geom = this.pristineGeom;
    const source = this.featureOverlay.getSource();
    if(this.zone.geom) {
      const geom = this.geomService.parseGeometryInput(this.map, this.zone.geom, {
        format: 'json'
      });
      const feature = new Feature({
        geometry: geom
      });
      source.addFeature(feature);
    } else {
      source.clear();
    }
    this.outputChange(this.zone.geom);
    this.zoneForm.reset({
      name: this.zone.name,
    });
  }

  private initMap(): void {

    const lastRain = new TileLayer({
      source: new TileWMS({
        url: 'http://afo.pigeosolutions.fr/geoserver/wms',
        params: {
          'FORMAT': 'image/png',
          tiled: true,
          LAYERS: 'afo:afo_2i5_lastrain'
        }
      })
    });

    this.map = new Map({
      layers: [
        new TileLayer({
          source: new XYZ({
            url: 'https://api.mapbox.com/styles/v1/fgravin/cjdywq8c938442sn38mir33hs/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZmdyYXZpbiIsImEiOiJjamN0bDMxaGgwam1oMndwZ2Mybmx4NXozIn0.CET5cPxi1znruX-wCJX3tg'
          })
        }), lastRain
      ],
      view: new View({
        center: [1802796.4860563292, 541537.2241887288],
        zoom: 4
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
    if(!this.firstChangeCheck) {
      this.firstChangeCheck = true;
    }
    else {
      this.zoneForm.markAsDirty();
    }

    if(geom) {
      const p = point(geom.coordinates);
      const format = new GeoJSON();
      let feature;

      [
        {radius: 50, style: '122,255,122'},
        {radius: 30, style:'255,122,122'}
      ].forEach(conf => {
        let buffered = buffer(p, conf.radius, {steps: 5});
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
