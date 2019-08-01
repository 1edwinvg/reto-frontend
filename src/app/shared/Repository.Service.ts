import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {
  private urlAddress = '/reto-autentia-backend/rest';
  constructor(private http: HttpClient) {}

  public getData(route: string) {
    // nos muetra la ruta que recoge para devolver el get//
    console.log('ruta getData() » ' + this.urlAddress + route);
    return this.http.get(
      this.createCompleteRoute(route, this.urlAddress)
    );
  }

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
}
