import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const zones = [
      {
        id: 11,
        name: 'Niamey',
        geom: {"type":"Polygon","coordinates":[[[123.848876953125,8.76209006730241],[124.89257812500003,11.110189976056759],[129.364013671875,9.694674535468664],[125.386962890625,7.663868809487624],[123.848876953125,8.76209006730241]]]}
      },
      {
        id: 12,
        name: 'Bamako',
        geom: {
          "type": "Point",
          "coordinates": [15, 2]
        }
      },
      {
        id: 13,
        name: 'Tunis',
        geom: {
          "type": "Point",
          "coordinates": [16, 2]
        }
      }
    ];
    return {zones};
  }
}
