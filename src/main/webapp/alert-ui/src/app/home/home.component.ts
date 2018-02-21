import {Component, OnInit} from "@angular/core";
import Map from "ol/map.js";
import View from "ol/view.js";
import TileLayer from "ol/layer/tile.js";
import Stamen from "ol/source/stamen.js";
import TileWMS from "ol/source/tilewms.js";
import {point} from "@turf/helpers";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  map: Map;
  constructor() {
    console.log('construct')
  }

  ngOnInit() {

    const bgLayer = new TileLayer({
      source: new Stamen({
        layer: 'toner'
      })
    });

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
      layers: [bgLayer, lastRain],
      target: 'homeMap',
      controls: [],
      view: new View({
        center: [37594.74831139161, 453648.1007129125],
        zoom: 6
      })
    });

    (<any>window).map = this.map;
  }
}
