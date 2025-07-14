import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../interfaces/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private baseUrl = 'https://silver-system-v66jv9vjg57j3p6qr-8080.app.github.dev/v1/api/student'; 

  constructor(private http: HttpClient) {}

  getAll(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.baseUrl}`);
  }

  getActive(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.baseUrl}/status/active`);
  }

  getInactive(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.baseUrl}/status/inactive`);
  }

  getById(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.baseUrl}/${id}`);
  }

  save(student: Student): Observable<Student> {
    return this.http.post<Student>(`${this.baseUrl}/save`, student);
  }

  update(id: number, student: Student): Observable<Student> {
    return this.http.put<Student>(`${this.baseUrl}/update/${id}`, student);
  }

  delete(id: number): Observable<Student> {
    return this.http.delete<Student>(`${this.baseUrl}/delete/${id}`);
  }

  restore(id: number): Observable<Student> {
    return this.http.patch<Student>(`${this.baseUrl}/restore/${id}`, {});
  }
}