import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {User} from "./user";
import {Zone} from "../zone/zone";
import {Observable} from "rxjs/Observable";
import {of} from "rxjs/observable/of";
import {MessageService} from "../message.service";
import {tap} from "rxjs/operators/tap";
import {catchError} from "rxjs/operators/catchError";
import {HttpHeaders} from "@angular/common/http";
import {ApiService} from "../common/api.service";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

const urisHttpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'text/uri-list' }),
};

@Injectable()
export class UserService {

  private usersUrl = 'users';
  private zonesUrl = 'zones';

  constructor(
    private http: HttpClient,
    private apiService: ApiService,
    private messageService: MessageService) {
    this.usersUrl = apiService.getBaseApi() + this.usersUrl;
    this.zonesUrl = apiService.getBaseApi() + this.zonesUrl;
  }

  getUsers(): Observable<User[]> {
    this.messageService.add('UserService: fetched users');
    return this.http.get(this.usersUrl)
      .map((response: any) =>
        response._embedded ? response._embedded.users : response)
      .pipe(
        tap(users => this.log(`fetched users`)),
        catchError(this.handleError('getUsers', []))
      );
  }

  getUser(id: number): Observable<User> {
    const url = `${this.usersUrl}/${id}`;
    return this.http.get<User>(url).pipe(
      tap(_ => this.log(`fetched user id=${id}`)),
      catchError(this.handleError<User>(`getUser id=${id}`))
    );
  }

  getZones(id: number): Observable<Zone[]> {
    const url = `${this.usersUrl}/${id}/zones`;
    return this.http.get<User>(url).pipe(
      tap(_ => this.log(`fetched zones for user id=${id}`)),
      catchError(this.handleError<User>(`getUser id=${id}`))
    );
  }

  /* GET users whose name contains search term */
  searchUsers(term: string): Observable<User[]> {
    if (!term.trim()) {
      // if not search term, return empty user array.
      return of([]);
    }
    return this.http.get<User[]>(`api/users/?name=${term}`).pipe(
      tap(_ => this.log(`found users matching "${term}"`)),
      catchError(this.handleError<User[]>('searchUsers', []))
    );
  }

  /** POST: add a new user to the server */
  addUser (user: User): Observable<User> {
    return this.http.post<User>(this.usersUrl, user, httpOptions).pipe(
      tap((user: User) => this.log(`added user w/ id=${user.id}`)),
      catchError(this.handleError<User>('addUser'))
    );
  }

  /** PUT: update the user on the server */
  updateUser (user: User): Observable<any> {
    return this.http.put(`${this.usersUrl}/${user.id}`, user, httpOptions).pipe(
      tap(_ => this.log(`updated user id=${user.id}`)),
      catchError(this.handleError<any>('updateUser'))
    );
  }

  /** DELETE: delete the user from the server */
  deleteUser (user: User | number): Observable<User> {
    const id = typeof user === 'number' ? user : user.id;
    const url = `${this.usersUrl}/${id}`;

    return this.http.delete<User>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted user id=${id}`)),
      catchError(this.handleError<User>('deleteUser'))
    );
  }

  putZones (user: User, zones: Zone[]): Observable<any> {
    const urisList = zones.map(zone => zone.id).join('\n');
    return this.http.put(`${this.usersUrl}/${user.id}/zones`, urisList, urisHttpOptions).pipe(
      tap(_ => this.log(`put zone for user id=${user.id}`)),
      catchError(this.handleError<User>('putZones'))
    );
  }

  private log(message: string) {
    this.messageService.add('UserService: ' + message);
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
