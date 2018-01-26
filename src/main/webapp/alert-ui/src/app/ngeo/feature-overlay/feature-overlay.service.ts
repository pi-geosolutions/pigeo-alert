import { Injectable } from '@angular/core';
import Map from 'ol/map.js'
import VectorLayer from 'ol/layer/vector.js'
import VectorSource from 'ol/source/vector.js'
import Style from 'ol/style/style.js'
import Fill from 'ol/style/fill.js'
import Stroke from 'ol/style/stroke.js'
import Circle from 'ol/style/circle.js'

@Injectable()
export class FeatureOverlayService {

  private groups_: Object = {};

  constructor() { }

  private createFeatureOverlay(): VectorLayer {
    return new VectorLayer({
      source: new VectorSource({
        useSpatialIndex: true
      }),
      name: 'geometry-tool-layer',
      style: [
        new Style({  // this is the default editing style
          fill: new Fill({
            color: 'rgba(255, 255, 255, 0.5)'
          }),
          stroke: new Stroke({
            color: 'white',
            width: 5
          })
        }),
        new Style({
          stroke: new Stroke({
            color: 'rgba(0, 153, 255, 1)',
            width: 3
          }),
          image: new Circle({
            radius: 6,
            fill: new Fill({
              color: 'rgba(0, 153, 255, 1)'
            }),
            stroke: new Stroke({
              color: 'white',
              width: 1.5
            })
          })
        })
      ]
    });
  }

  getFeatureOverlay(map): VectorLayer {
    const id = map.ol_uid;
    if(!id) console.error('feature-overlay: map has no id');

    if(!this.groups_[id]) {
      const layer: VectorLayer = this.createFeatureOverlay();
      layer.setMap(map);
      this.groups_[id] = layer;
    }
    return this.groups_[id];
  }
}
