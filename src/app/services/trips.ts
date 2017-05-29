import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Trip } from '../models/trip';
import { Area } from '../models/area';



@Injectable()
export class TripsService {
  //private API_PATH = 'https://www.googleapis.com/books/v1/volumes';
  private TRIP_PATH = 'https://www.worldia.com/api/v1/trips/?criteria[state]=template';
  private AREA_PATH = 'https://www.worldia.com/api/v1/areas/';

  constructor(private http: Http) {}

  getAllTrips(): Observable<Trip[]> {
    return this.http.get(`${this.TRIP_PATH}`)
      .map(res => res.json() || []);
  }

  getAllAreas(): Observable<Area[]> {
    return this.http.get(`${this.AREA_PATH}`)
      .map(res => res.json() || []);
  }

  searchTrips(queryTitle: string): Observable<Trip[]> {
    return this.http.get(`${this.TRIP_PATH}&q=${queryTitle}`)
      .map(res => res.json().items || []);
  }

  retrieveTrip(volumeId: string): Observable<Trip> {
    return this.http.get(`${this.TRIP_PATH}/${volumeId}`)
      .map(res => res.json());
  }
}
