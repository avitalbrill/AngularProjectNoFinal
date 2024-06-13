
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PatientService } from '../../services/patient.service';
import { Patient } from '../../models/patient';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { UpdatePatientComponent } from '../patient/update-patient/update-patient.component';
import { AddPatientComponent } from '../patient/add-patient/add-patient.component';
import { Route, Router } from '@angular/router';
import { AddDialogPatientComponent } from '../patient/add-dialog-patient/add-dialog-patient.component';


@Component({
  selector: 'app-patients-list',
  standalone: true,
  templateUrl: './patients-list.component.html',
  imports: [CommonModule, MatTableModule, MatIconModule, MatButtonModule, MatSortModule,UpdatePatientComponent,AddPatientComponent,AddDialogPatientComponent,AddPatientComponent],
  styleUrls: ['./patients-list.component.css'],
})
export class PatientsListComponent implements OnInit {
  public patientsList: Patient[] = [];
  public displayedColumns: string[] = ['tz', 'firstName', 'lastName', 'actions'];
  public add:boolean= false;
  public isClicked = false;

  constructor(private _patientService: PatientService,private router:Router) {}
 
  ngOnInit() {
    this._patientService.getAllPatients().subscribe({
      next: (res) => {
        this.patientsList = res;
      },
      error: (err) => {
        console.error('Error fetching patients', err);
      }
    });
  }


  delete(patient: Patient) {
    const confirmation = confirm(`Are you sure you want to delete ${patient.firstName} ${patient.lastName}?`);
    if (confirmation) {
      this._patientService.deletePatient(patient.id).subscribe({
        next: () => {
          this.patientsList = this.patientsList.filter(d => d.id !== patient.id);
          console.log('Patient deleted successfully');
        },
        error: (err) => {
          console.error('Failed to delete patient:', err);
        }
      });
    }
  }


  saveEditPatient(patient: Patient) {
    this._patientService.updatePatient(patient.id, patient).subscribe({
      next: () => console.log('Patient updated successfully'),
      error: (err) => console.error('Failed to update patient:', err)
    });
  }

  updatePatient(patient: Patient) {
    this.router.navigate(['/update-patient', patient.id]);
  }
}

