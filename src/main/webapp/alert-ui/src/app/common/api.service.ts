import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class ApiService {

  constructor() { }

  getBaseApi(): string  {
    let url = 'http://localhost:8080/';
    if (!environment.dev) {
      url = '/pi-alert/';
    }
    return url;
  }

}
