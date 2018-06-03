import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Bassin} from "./bassin";
import {Observable} from "rxjs/Observable";
import {of} from "rxjs/observable/of";
import {MessageService} from "../message.service";
import {tap} from "rxjs/operators/tap";
import {catchError} from "rxjs/operators/catchError";
import {HttpHeaders} from "@angular/common/http";
import {ApiService} from "../common/api.service";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class BassinService {

  private bassinsUrl = 'bassins';  // URL to web api

  constructor(
    private http: HttpClient,
    private apiService: ApiService,
    private messageService: MessageService) {
    this.bassinsUrl = apiService.getBaseApi() + this.bassinsUrl;
  }

  getBassins(): Observable<Bassin[]> {
    this.messageService.add('BassinService: fetched bassins');
    return this.http.get<Bassin[]>(this.bassinsUrl)
      .map((response: any) =>
        response._embedded ? response._embedded.bassins : response)
      .do((bassins: Bassin[]) =>
        bassins.forEach( bassin => bassin.fullname = `${bassin.maj_name} - ${bassin.sub_name}`))
      .map((response: any) =>
        response.sort( (a, b) => (a.fullname < b.fullname) ? -1 : 1))
      .pipe(
        tap(bassins => this.log(`fetched bassins`)),
        catchError(this.handleError('getBassins', []))
      );
  }

  getBassin(id: number): Observable<Bassin> {
    const url = `${this.bassinsUrl}/${id}`;
    return this.http.get<Bassin>(url).pipe(
      tap(_ => this.log(`fetched bassin id=${id}`)),
      catchError(this.handleError<Bassin>(`getBassin id=${id}`))
    );
  }

  /* GET bassins whose name contains search term */
  searchBassins(term: string): Observable<Bassin[]> {
    if (!term.trim()) {
      // if not search term, return empty bassin array.
      return of([]);
    }
    return this.http.get<Bassin[]>(`api/bassins/?name=${term}`).pipe(
      tap(_ => this.log(`found bassins matching "${term}"`)),
      catchError(this.handleError<Bassin[]>('searchBassins', []))
    );
  }

  /** POST: add a new bassin to the server */
  addBassin (bassin: Bassin): Observable<Bassin> {
    return this.http.post<Bassin>(this.bassinsUrl, bassin, httpOptions).pipe(
      tap((bassin: Bassin) => this.log(`added bassin w/ id=${bassin.gid}`)),
      catchError(this.handleError<Bassin>('addBassin'))
    );
  }

  /** PUT: update the bassin on the server */
  updateBassin (bassin: Bassin): Observable<any> {
    return this.http.put(`${this.bassinsUrl}/${bassin.gid}`, bassin, httpOptions).pipe(
      tap(_ => this.log(`updated bassin id=${bassin.gid}`)),
      catchError(this.handleError<any>('updateBassin'))
    );
  }

  /** DELETE: delete the bassin from the server */
  deleteBassin (bassin: Bassin | number): Observable<Bassin> {
    const id = typeof bassin === 'number' ? bassin : bassin.gid;
    const url = `${this.bassinsUrl}/${id}`;

    return this.http.delete<Bassin>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted bassin id=${id}`)),
      catchError(this.handleError<Bassin>('deleteBassin'))
    );
  }


  private log(message: string) {
    this.messageService.add('BassinService: ' + message);
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
