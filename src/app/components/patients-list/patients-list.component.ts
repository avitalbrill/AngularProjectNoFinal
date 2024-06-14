
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
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-patients-list',
  standalone: true,
  templateUrl: './patients-list.component.html',
  imports: [CommonModule, MatTableModule, MatIconModule, MatButtonModule, MatSortModule,UpdatePatientComponent,AddPatientComponent,AddDialogPatientComponent,AddPatientComponent,ReactiveFormsModule,FormsModule,AddDialogPatientComponent,FormsModule,ReactiveFormsModule],
  styleUrls: ['./patients-list.component.css'],
})
export class PatientsListComponent implements OnInit {
  public patientList: Patient[] = [];
  public displayedColumns: string[] = ['id','firstName', 'lastName', 'age', 'actions'];
  public add: boolean = false;
  public search: string = "";
  public filteredPatients: Patient[] = [];

  constructor(private patientService: PatientService,private router:Router) {}

  ngOnInit(): void {
    this.loadPatients();
  }

  loadPatients(): void {
    this.patientService.getAllPatients().subscribe({
      next: (res) => {
        this.patientList = res;
        this.filteredPatients = res; // Initialize filtered list
      },
      error: (err) => {
        console.error('Failed to fetch patients:', err);
      }
    });
  }

  filterPatients(): void {
    const lowerCaseSearch = this.search.toLowerCase();
    this.filteredPatients = this.patientList.filter(patient =>
      patient.firstName.toLowerCase().includes(lowerCaseSearch) ||
      patient.lastName.toLowerCase().includes(lowerCaseSearch)
    );
  }

  saveEditPatient(patient: Patient): void {
    this.patientService.updatePatient(patient.id!, patient).subscribe({
      next: () => {
        console.log("Patient updated successfully");
        this.loadPatients();
      },
      error: (err) => {
        console.error('Failed to update patient:', err);
      }
    });
  }
  navigateToDeletePatient(id:number){
    this.router.navigate([`/delete/${id}`])
  }

  deletePatient(patient: Patient): void {
    const confirmation = confirm(`Are you sure you want to delete ${patient.firstName} ${patient.lastName}?`);
    if (confirmation) {
      this.patientService.deletePatient(patient.id!).subscribe({
        next: () => {
          this.patientList = this.patientList.filter(d => d.id !== patient.id);
          this.filteredPatients = this.filteredPatients.filter(d => d.id !== patient.id);
          console.log('Patient deleted successfully');
        },
        error: (err) => {
          console.error('Failed to delete patient:', err);
        }
      });
    }
  }
}

