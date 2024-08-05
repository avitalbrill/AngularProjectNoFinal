import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Patient } from '../models/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private patientUpdatedSubject = new Subject<void>();

  constructor(private http: HttpClient) {}

  getAllPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>('https://localhost:7257/api/Patient');
  }

  getPatientById(patientId: number): Observable<Patient> {
    return this.http.get<Patient>(`https://localhost:7257/api/Patient/${patientId}`);
  }

  addPatient(patientData: Patient): Observable<Patient> {
    return this.http.post<Patient>('https://localhost:7257/api/Patient', patientData).pipe(
      tap(() => {
        this.patientUpdatedSubject.next();
      })
    );
  }

  updatePatient(patientId: number, patientData: Patient): Observable<Patient> {
    return this.http.put<Patient>(`https://localhost:7257/api/Patient/${patientId}`, patientData).pipe(
      tap(() => {
        this.patientUpdatedSubject.next();
      })
    );
  }

  deletePatient(patientId: number): Observable<any> {
    return this.http.delete<any>(`https://localhost:7257/api/Patient/${patientId}`).pipe(
      tap(() => {
        this.patientUpdatedSubject.next();
      })
    );
  }

  getPatientUpdateListener(): Observable<void> {
    return this.patientUpdatedSubject.asObservable();
  }
}
