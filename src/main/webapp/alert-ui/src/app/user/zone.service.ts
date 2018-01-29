import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Zone} from "./zone";
import {Observable} from "rxjs/Observable";
import {of} from "rxjs/observable/of";
import {MessageService} from "../message.service";
import {tap} from "rxjs/operators/tap";
import {catchError} from "rxjs/operators/catchError";
import {HttpHeaders} from "@angular/common/http";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ZoneService {

  private zonesUrl = 'api/zones';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  getZones(): Observable<Zone[]> {
    this.messageService.add('ZoneService: fetched zones');
    return this.http.get<Zone[]>(this.zonesUrl)
      .pipe(
        tap(zones => this.log(`fetched zones`)),
        catchError(this.handleError('getZones', []))
      );
  }

  getZone(id: number): Observable<Zone> {
    const url = `${this.zonesUrl}/${id}`;
    return this.http.get<Zone>(url).pipe(
      tap(_ => this.log(`fetched zone id=${id}`)),
      catchError(this.handleError<Zone>(`getZone id=${id}`))
    );
  }

  /* GET zones whose name contains search term */
  searchZones(term: string): Observable<Zone[]> {
    if (!term.trim()) {
      // if not search term, return empty zone array.
      return of([]);
    }
    return this.http.get<Zone[]>(`api/zones/?name=${term}`).pipe(
      tap(_ => this.log(`found zones matching "${term}"`)),
      catchError(this.handleError<Zone[]>('searchZones', []))
    );
  }

  /** POST: add a new zone to the server */
  addZone (zone: Zone): Observable<Zone> {
    return this.http.post<Zone>(this.zonesUrl, zone, httpOptions).pipe(
      tap((zone: Zone) => this.log(`added zone w/ id=${zone.id}`)),
      catchError(this.handleError<Zone>('addZone'))
    );
  }

  /** PUT: update the zone on the server */
  updateZone (zone: Zone): Observable<any> {
    return this.http.put(this.zonesUrl, zone, httpOptions).pipe(
      tap(_ => this.log(`updated zone id=${zone.id}`)),
      catchError(this.handleError<any>('updateZone'))
    );
  }

  /** DELETE: delete the zone from the server */
  deleteZone (zone: Zone | number): Observable<Zone> {
    const id = typeof zone === 'number' ? zone : zone.id;
    const url = `${this.zonesUrl}/${id}`;

    return this.http.delete<Zone>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted zone id=${id}`)),
      catchError(this.handleError<Zone>('deleteZone'))
    );
  }


  private log(message: string) {
    this.messageService.add('ZoneService: ' + message);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
