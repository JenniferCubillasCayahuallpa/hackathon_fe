import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Location } from '../interfaces/location';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private baseUrl = 'https://silver-system-v66jv9vjg57j3p6qr-8080.app.github.dev/v1/api/location'; // Cambia la URL base según tu API

  constructor(private http: HttpClient) { }

  getAll(): Observable<Location[]> {
    return this.http.get<Location[]>(this.baseUrl);
  }

  getById(id: number): Observable<Location> {
    return this.http.get<Location>(`${this.baseUrl}/${id}`);
  }
}
