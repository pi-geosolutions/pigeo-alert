import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const zones = [
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
            "href": "http://localhost:8080/zones/1"
          },
          "zone": {
            "href": "http://localhost:8080/zones/1"
          },
          "users": {
            "href": "http://localhost:8080/zones/1/users"
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
            "href": "http://localhost:8080/zones/2"
          },
          "zone": {
            "href": "http://localhost:8080/zones/2"
          },
          "users": {
            "href": "http://localhost:8080/zones/2/users"
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
            "href": "http://localhost:8080/zones/3"
          },
          "zone": {
            "href": "http://localhost:8080/zones/3"
          },
          "users": {
            "href": "http://localhost:8080/zones/3/users"
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
            "href": "http://localhost:8080/zones/4"
          },
          "zone": {
            "href": "http://localhost:8080/zones/4"
          },
          "users": {
            "href": "http://localhost:8080/zones/4/users"
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
            "href": "http://localhost:8080/zones/5"
          },
          "zone": {
            "href": "http://localhost:8080/zones/5"
          },
          "users": {
            "href": "http://localhost:8080/zones/5/users"
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
            "href": "http://localhost:8080/zones/6"
          },
          "zone": {
            "href": "http://localhost:8080/zones/6"
          },
          "users": {
            "href": "http://localhost:8080/zones/6/users"
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
            "href": "http://localhost:8080/zones/7"
          },
          "zone": {
            "href": "http://localhost:8080/zones/7"
          },
          "users": {
            "href": "http://localhost:8080/zones/7/users"
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
            "href": "http://localhost:8080/zones/8"
          },
          "zone": {
            "href": "http://localhost:8080/zones/8"
          },
          "users": {
            "href": "http://localhost:8080/zones/8/users"
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
            "href": "http://localhost:8080/zones/9"
          },
          "zone": {
            "href": "http://localhost:8080/zones/9"
          },
          "users": {
            "href": "http://localhost:8080/zones/9/users"
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
    };
  }


}
