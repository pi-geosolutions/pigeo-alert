import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const zones = [
      {
        id: 11,
        name: 'Niamey',
        geom: {
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": [125.6, 10.1]
          }
        }
      },
      {
        id: 12,
        name: 'Bamako',
        geom: {
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": [15, 2]
          }
        }
      },
      {
        id: 13,
        name: 'Tunis',
        geom: {
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": [16, 2]
          }
        }
      }
    ];
    return {zones};
  }
}
