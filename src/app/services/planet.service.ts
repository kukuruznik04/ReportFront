import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlanetService {

  urlPrefix = '/planet';

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(`${environment.apiUrl}${this.urlPrefix}`);
  }

  get(id: string) {
    return this.http.get(`${environment.apiUrl}${this.urlPrefix}/${id}`);
  }
  post(body: any) {
    return this.http.post(`${environment.apiUrl}${this.urlPrefix}`, body);
  }
  put(id: string, body: any) {
    return this.http.put(`${environment.apiUrl}${this.urlPrefix}/${id}`, body);
  }
  delete(id: string) {
    return this.http.delete(`${environment.apiUrl}${this.urlPrefix}/${id}`);
  }
}
