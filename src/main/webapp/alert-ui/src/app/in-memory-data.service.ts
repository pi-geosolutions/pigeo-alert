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
    const alertZones = [
      {
        "id": 1,
        "name": "Paris",
        "geom": {
          "type": "Point",
          "coordinates": [
            12,
            25
          ]
        },
        "_links": {
          "self": {
            "href": "http://localhost:8080/alertZones/1"
          },
          "alertZone": {
            "href": "http://localhost:8080/alertZones/1"
          },
          "users": {
            "href": "http://localhost:8080/alertZones/1/users"
          }
        }
      },
      {
        "id": 2,
        "name": "London",
        "geom": {
          "type": "Point",
          "coordinates": [
            117.2,
            31.8
          ]
        },
        "_links": {
          "self": {
            "href": "http://localhost:8080/alertZones/2"
          },
          "alertZone": {
            "href": "http://localhost:8080/alertZones/2"
          },
          "users": {
            "href": "http://localhost:8080/alertZones/2/users"
          }
        }
      },
      {
        "id": 3,
        "name": "London",
        "geom": {
          "type": "Point",
          "coordinates": [
            117.2,
            31.8
          ]
        },
        "_links": {
          "self": {
            "href": "http://localhost:8080/alertZones/3"
          },
          "alertZone": {
            "href": "http://localhost:8080/alertZones/3"
          },
          "users": {
            "href": "http://localhost:8080/alertZones/3/users"
          }
        }
      },
      {
        "id": 4,
        "name": "London",
        "geom": {
          "type": "Point",
          "coordinates": [
            117.2,
            31.8
          ]
        },
        "_links": {
          "self": {
            "href": "http://localhost:8080/alertZones/4"
          },
          "alertZone": {
            "href": "http://localhost:8080/alertZones/4"
          },
          "users": {
            "href": "http://localhost:8080/alertZones/4/users"
          }
        }
      },
      {
        "id": 5,
        "name": "London",
        "geom": {
          "type": "Point",
          "coordinates": [
            117.2,
            31.8
          ]
        },
        "_links": {
          "self": {
            "href": "http://localhost:8080/alertZones/5"
          },
          "alertZone": {
            "href": "http://localhost:8080/alertZones/5"
          },
          "users": {
            "href": "http://localhost:8080/alertZones/5/users"
          }
        }
      },
      {
        "id": 6,
        "name": "London",
        "geom": {
          "type": "Point",
          "coordinates": [
            117.2,
            31.8
          ]
        },
        "_links": {
          "self": {
            "href": "http://localhost:8080/alertZones/6"
          },
          "alertZone": {
            "href": "http://localhost:8080/alertZones/6"
          },
          "users": {
            "href": "http://localhost:8080/alertZones/6/users"
          }
        }
      },
      {
        "id": 7,
        "name": "London",
        "geom": {
          "type": "Point",
          "coordinates": [
            117.2,
            31.8
          ]
        },
        "_links": {
          "self": {
            "href": "http://localhost:8080/alertZones/7"
          },
          "alertZone": {
            "href": "http://localhost:8080/alertZones/7"
          },
          "users": {
            "href": "http://localhost:8080/alertZones/7/users"
          }
        }
      },
      {
        "id": 8,
        "name": "London",
        "geom": {
          "type": "Point",
          "coordinates": [
            117.2,
            31.8
          ]
        },
        "_links": {
          "self": {
            "href": "http://localhost:8080/alertZones/8"
          },
          "alertZone": {
            "href": "http://localhost:8080/alertZones/8"
          },
          "users": {
            "href": "http://localhost:8080/alertZones/8/users"
          }
        }
      },
      {
        "id": 9,
        "name": "London",
        "geom": {
          "type": "Point",
          "coordinates": [
            117.2,
            31.8
          ]
        },
        "_links": {
          "self": {
            "href": "http://localhost:8080/alertZones/9"
          },
          "alertZone": {
            "href": "http://localhost:8080/alertZones/9"
          },
          "users": {
            "href": "http://localhost:8080/alertZones/9/users"
          }
        }
      }
    ];
    const users = {
      "_embedded": {
        "users": [
          {
            "id": 1,
            "firstname": "Florent",
            "lastname": "Gravin",
            "roles": [],
            "test": null,
            "_links": {
              "self": {
                "href": "http://localhost:8080/users/1"
              },
              "user": {
                "href": "http://localhost:8080/users/1"
              },
              "zones": {
                "href": "http://localhost:8080/users/1/zones"
              }
            }
          },
          {
            "id": 2,
            "firstname": "Jean",
            "lastname": "Pommier",
            "roles": [],
            "test": null,
            "_links": {
              "self": {
                "href": "http://localhost:8080/users/2"
              },
              "user": {
                "href": "http://localhost:8080/users/2"
              },
              "zones": {
                "href": "http://localhost:8080/users/2/zones"
              }
            }
          },
          {
            "id": 3,
            "firstname": "Pierre",
            "lastname": "Menton",
            "roles": [],
            "test": null,
            "_links": {
              "self": {
                "href": "http://localhost:8080/users/3"
              },
              "user": {
                "href": "http://localhost:8080/users/3"
              },
              "zones": {
                "href": "http://localhost:8080/users/3/zones"
              }
            }
          }
        ]
      },
      "_links": {
        "self": {
          "href": "http://localhost:8080/users"
        },
        "profile": {
          "href": "http://localhost:8080/profile/users"
        },
        "search": {
          "href": "http://localhost:8080/users/search"
        }
      }
    };

    return {
      zones,
      users,
      alertZones
    };
  }


}
