import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Program } from '../interfaces/program';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {
  private baseUrl = 'https://silver-system-v66jv9vjg57j3p6qr-8080.app.github.dev/v1/api/program'; // Cambia la URL base según tu API

  constructor(private http: HttpClient) { }

  getAll(): Observable<Program[]> {
    return this.http.get<Program[]>(this.baseUrl);
  }

  getById(id: number): Observable<Program> {
    return this.http.get<Program>(`${this.baseUrl}/${id}`);
  }
}