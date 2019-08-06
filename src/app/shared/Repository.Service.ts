import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './MessageService';
import { Hero } from '../interface/prueba';
import { Catalogo } from '../interface/catalago.model';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {


  private urlAddress = '/reto-autentia-backend/rest';


  constructor(private http: HttpClient, private messageService: MessageService) {}

  public getData(route: string) {
    // nos muetra la ruta que recoge para devolver el get//
    console.log('ruta getData() » ' + this.urlAddress + route);
    return this.http.get(
      this.createCompleteRoute(route, this.urlAddress)
    );
  }

  // public getDato(route: string): Observable<Catalogo[]> {
  //   return this.http.get<Catalogo[]>(this.urlAddress + route)
  //   .pipe(
  //     tap(_ => this.log('cursos')),
  //     catchError(this.handleError<Catalogo[]>('getDato', []))
  //   );
  // }

  public create(route: string, body) {
    return this.http.post(
      this.createCompleteRoute(route, this.urlAddress),
      body,
      this.generateHeaders()
    );
  }

  public update(route: string, body) {
    return this.http.put(
      this.createCompleteRoute(route, this.urlAddress),
      body,
      this.generateHeaders()
    );
  }

  public delete(route: string) {
    return this.http.delete(
      this.createCompleteRoute(route, this.urlAddress)
    );
  }

  private createCompleteRoute(route: string, envAddress: string) {
    return `${envAddress}/${route}`;
  }

  private generateHeaders() {
    return {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  }

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

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}
