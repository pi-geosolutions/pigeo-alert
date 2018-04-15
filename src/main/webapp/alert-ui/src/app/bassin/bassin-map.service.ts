import {Injectable} from "@angular/core";
import Map from "ol/map.js";
import View from "ol/view.js";
import TileLayer from "ol/layer/tile.js";
import XYZ from "ol/source/xyz.js";
import TileWMS from "ol/source/tilewms.js";
import Stroke from "ol/style/stroke";
import Fill from 'ol/style/fill';
import Style from "ol/style/style";
import Feature from "ol/feature.js";
import {Bassin} from "./bassin";
import {GeometryService} from "../ngeo/geom/geometry.service";
import VectorLayer from "ol/layer/vector.js";

@Injectable()
export class BassinMapService {

  constructor(
    private geomService: GeometryService,
  ) { }

  initMap(): Map {

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

    return new Map({
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
  }

  getStyle(): Style {
    return new Style({
      fill: new Fill({
        color: 'rgba(63, 81, 181, 0.2)'
      }),
      stroke: new Stroke({
        color: 'rgba(63, 81, 181, 1)',
        width: 1
      })
    });
  }

  getHLStyle(): Style {
    return new Style({
      fill: new Fill({
        color: 'rgba(63, 81, 181, 0.2)'
      }),
      stroke: new Stroke({
        color: 'orange',
        width: 2
      })
    });
  }

  setFeature(bassin: Bassin, featureOverlay: VectorLayer, map: Map): Feature {
    const source = featureOverlay.getSource();
    const geom = this.geomService.parseGeometryInput(map, bassin.the_geom, {
      format: 'json'
    });
    const feature = new Feature({
      geometry: geom
    });
    source.addFeature(feature);
    return feature;
  }

}
