import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Doctor } from '../models/doctor';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private http: HttpClient)
  {

  }
  getAllDoctors(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>('https://localhost:7257/api/Doctor');
  }
  getDoctorById(doctorId: number): Observable<Doctor> {
    return this.http.get<Doctor>(`https://localhost:7257/api/Doctor/${doctorId}`);
  }
  addDoctor(doctorData: Doctor): Observable<Doctor> {
    return this.http.post<Doctor>('https://localhost:7257/api/Doctor', doctorData);
  }
  updateDoctor(doctorId: number, doctorData: Doctor): Observable<Doctor> {
    return this.http.put<Doctor>(`https://localhost:7257/api/Doctor/${doctorId}`, doctorData);
  }
  deleteDoctor(doctorId: number): Observable<any> {
    return this.http.delete<any>(`https://localhost:7257/api/Doctor/${doctorId}`);
  }
      
}
