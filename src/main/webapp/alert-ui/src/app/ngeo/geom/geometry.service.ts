import { Injectable } from '@angular/core';

import WKT from 'ol/format/wkt.js';
import GeoJSON from 'ol/format/geojson.js';
import GML from 'ol/format/gml.js';
import Feature from 'ol/feature.js';
import Geometry from 'ol/geom/geometry.js';


@Injectable()
export class GeometryService {

  constructor() { }

  parseGeometryInput(map, input: any, options): void {

    options = Object.assign({
      crs: 'EPSG:4326',
      format: 'gml'
    }, options);

    const formatLabel = options.format.toLowerCase();
    const outputProjection = map.getView().getProjection();
    let format;
    let outputValue = null;

    switch (formatLabel) {
      case 'json':
      case 'geojson':
        format = new GeoJSON();
        outputValue = format.readGeometry(input, {
          dataProjection: options.crs,
          featureProjection: outputProjection
        });
        break;

      case 'wkt':
        format = new WKT();
        outputValue = format.readGeometry(input, {
          dataProjection: options.crs,
          featureProjection: outputProjection
        });
        break;

      case 'gml':
        format = new GML({
          featureNS: 'http://www.opengis.net/gml',
          featureType: 'feature'
        });
        const fullXml = `
            <featureMembers>
                <gml:feature xmlns:gml="http://www.opengis.net/gml">
                    <geometry>${input}</geometry>
                </gml:feature>
            </featureMembers>
        `;

        const feature = format.readFeatures(fullXml, {
          dataProjection: options.crs,
          featureProjection: outputProjection
        })[0];
        outputValue = feature.getGeometry();
        break;

      // no valid format specified: handle as object
      default:
      case 'object':
        if (!(input instanceof Geometry)) {
          console.error('gn-geometry-tool input was supposed to be a ' +
            'ol.geom.Geometry object but was something else, ' +
            'skipping parse.', input);
          return outputValue;
        }
        outputValue = input.clone.transform(options.crs, outputProjection);
        break;
    }

    return outputValue;
  };

  printGeometryOutput (map, feature, options) {
    options = Object.assign({
      crs: 'EPSG:4326',
      format: 'gml'
    }, options);

    // clone & transform geom
    const outputGeom = feature.getGeometry().clone().transform(
      map.getView().getProjection(),
      options.crs || 'EPSG:4326'
    );
    const outputFeature = new Feature({
      geometry: outputGeom
    });

    // set id on feature
    feature.setId('geometry-tool-output');

    const formatLabel = options.format.toLowerCase();
    let format;
    let outputValue;
    switch (formatLabel) {
      case 'json':
      case 'geojson':
        format = new GeoJSON();
        if (options.outputAsFeatures) {
          outputValue = format.writeFeatures([outputFeature]);
        } else {
          outputValue = format.writeGeometry(outputGeom);
        }
        outputValue = JSON.parse(outputValue);
        outputValue.crs = {
          "type":"name",
          "properties": {
            "name":options.crs
          }
        };
        break;

      case 'wkt':
        format = new WKT();
        if (options.outputAsFeatures) {
          outputValue = format.writeFeatures([outputFeature]);
        } else {
          outputValue = format.writeGeometry(outputGeom);
        }
        break;

      case 'gml':
        format = new GML({
          featureNS: options.gmlFeatureNS ||
          'http://mapserver.gis.umn.edu/mapserver',
          featureType: options.gmlFeatureElement || 'features',
          srsName: options.crs !== 'EPSG:4326' ? options.crs : undefined
        });

        if (options.outputAsWFSFeaturesCollection) {
          outputValue = `
            <wfs:FeatureCollection xmlns:wfs="http://www.opengis.net/wfs">
                ${format.writeFeatures([outputFeature])} 
            </wfs:FeatureCollection>;
          `;
        } else if (options.outputAsFeatures) {
          outputValue = format.writeFeatures([outputFeature]);
        } else {
          var nodes = format.writeFeaturesNode([outputFeature])
            .firstChild.childNodes;
          let geom = null;
          for (let i = 0; i < nodes.length; i++) {
            let node = nodes.item(0);
            if (node.localName === outputFeature.getGeometryName()) {
              geom = node;
            }
          }
          if (!geom) {
            console.warn('No geometry found for feature', feature);
            return null;
          }
          outputValue = geom.innerHTML;
        }
        break;

      // no valid format specified: output as object + give warning
      default:
        console.warn('No valid output format specified for ' +
          'gn-geometry-tool (value=' + options.format + '); ' +
          'outputting geometry as object');

      case 'object':
        if (options.outputAsFeatures) {
          outputValue = [outputFeature];
        } else {
          outputValue = outputGeom;
        }
        break;
    }

    return outputValue;
  };

}
