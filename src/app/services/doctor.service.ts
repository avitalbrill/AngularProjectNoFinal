import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { Doctor } from '../models/doctor';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private doctorUpdatedSubject = new Subject<void>();

  constructor(private http: HttpClient) { }

  getAllDoctors(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>('https://localhost:7257/api/Doctor');
  }

  getDoctorById(doctorId: number): Observable<Doctor> {
    return this.http.get<Doctor>(`https://localhost:7257/api/Doctor/${doctorId}`);
  }

  addDoctor(doctorData: Doctor): Observable<Doctor> {
    return this.http.post<Doctor>('https://localhost:7257/api/Doctor', doctorData).pipe(
      tap(() => {
        this.doctorUpdatedSubject.next();
      })
    );
  }

  updateDoctor(doctorId: number, doctorData: Doctor): Observable<Doctor> {
    return this.http.put<Doctor>(`https://localhost:7257/api/Doctor/${doctorId}`, doctorData).pipe(
      tap(() => {
        this.doctorUpdatedSubject.next();
      })
    );
  }

  deleteDoctor(doctorId: number): Observable<any> {
    return this.http.delete<any>(`https://localhost:7257/api/Doctor/${doctorId}`).pipe(
      tap(() => {
        this.doctorUpdatedSubject.next();
      })
    );
  }

  getDoctorUpdateListener(): Observable<void> {
    return this.doctorUpdatedSubject.asObservable();
  }
}
