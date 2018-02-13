import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {FeatureOverlayService} from "../../feature-overlay/feature-overlay.service";
import {NgeoUtilsService} from "../../ngeo-utils.service";
import {GeometryService} from "../geometry.service";

import Map from 'ol/map.js';
import Feature from 'ol/feature.js';
import Geometry from 'ol/geom/geometry.js';
import Draw from 'ol/interaction/draw.js';
import Modify from 'ol/interaction/modify.js';
import DoubleClickZoom from 'ol/interaction/doubleclickzoom.js';
import VectorLayer from 'ol/layer/vector.js'


@Component({
  selector: 'ngeo-geometry-tool',
  templateUrl: './geometry-tool.component.html',
  styleUrls: ['./geometry-tool.component.scss'],
  inputs: [
    'map',
    'allowReset: ngeo-geom-allow-reset',
    'allowModify: ngeo-geom-allow-modify',
    'outputCrs: ngeo-geom-outputcrs',
    'outputFormat: ngeo-geom-outputformat',
    'intputFormat: ngeo-geom-inputformat',
    'geomType: ngeo-geom-type'
  ]
})
export class GeometryToolComponent implements OnInit {

  private map: Map;
  private geomType: string;
  private outputCrs: string;
  private outputFormat: string;
  private intputFormat: string;
  private allowModify: boolean;
  private allowReset: boolean;
  private drawInteraction: Draw;
  private modifyInteraction: Modify;
  private featureOverlay: VectorLayer;

  @Output() outputChange = new EventEmitter();
  @Input() output: string;

  constructor(
    private foService: FeatureOverlayService,
    private geomService: GeometryService,
    private ngeoUtilsService: NgeoUtilsService) { }

  ngOnInit() {
    const map = this.map;
    this.featureOverlay = this.foService.getFeatureOverlay(map);
    const source = this.featureOverlay.getSource();

    this.drawInteraction = new Draw({
      type: this.geomType,
      source: source
    });
    this.modifyInteraction = new Modify({
      source: source
    });

    map.addInteraction(this.drawInteraction);
    map.addInteraction(this.modifyInteraction);
    this.drawInteraction.setActive(false);
    this.modifyInteraction.setActive(false);

    this.ngeoUtilsService.decorateInteration(this.drawInteraction);
    this.ngeoUtilsService.decorateInteration(this.modifyInteraction);

    // Disable double click zoom on drawying
    let zoomInteraction = null;
    map.getInteractions().forEach(function(interaction) {
      if (interaction instanceof DoubleClickZoom) {
        zoomInteraction = interaction;
      }
    });

    this.drawInteraction.on('drawend', (event) => {
      this.clearFeatures();
      this.updateOutput(event.feature);

      this.drawInteraction.active = false;

      if (zoomInteraction) {
        zoomInteraction.setActive(false);
        setTimeout(function() {
          zoomInteraction.setActive(true);
        }, 251);
      }
    });

    const geometry: Geometry = this.geomService.parseGeometryInput(map, this.output, {
      format: this.intputFormat
    });
    const feature = new Feature({
      geometry: geometry
    });
    feature.setId('geometry-tool-output');
    source.addFeature(feature);
    if(geometry) {
      setTimeout(() => this.updateOutput(feature));
    }
  }

  ngOnDestroy() {
    this.map.removeInteraction(this.drawInteraction);
    this.map.removeInteraction(this.modifyInteraction);
  }

  clearFeatures(): void {
    this.featureOverlay.getSource().clear();
  }

  reset(): void {
    this.clearFeatures();
    this.output = '';
    this.outputChange.emit(this.output);
  }

  private updateOutput(feature) {
    if(feature) {
      this.output = this.geomService.printGeometryOutput(this.map, feature, {
        crs: this.outputCrs,
        format: this.outputFormat
      });
      this.outputChange.emit(this.output);
    }
  }
}
