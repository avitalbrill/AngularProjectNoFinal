import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Patient } from '../models/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http: HttpClient)
   { }
  getAllPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>('https://localhost:7257/api/Patient');
  }
  getPatientById(patientId: number): Observable<Patient> {
    return this.http.get<Patient>(`https://localhost:7257/api/Patient/${patientId}`);
  }
  addPatient(patientData: Patient): Observable<Patient> {
    return this.http.post<Patient>('https://localhost:7257/api/Patient', patientData);
  }
  updatePatient(patientId: number, patientData: Patient): Observable<Patient> {
    return this.http.put<Patient>(`https://localhost:7257/api/Patient/${patientId}`, patientData);
  }
  deletePatient(patientId: number): Observable<any> {
    return this.http.delete<any>(`https://localhost:7257/api/Patient/${patientId}`);
  }
        
}
