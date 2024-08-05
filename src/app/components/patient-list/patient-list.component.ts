import { Component, OnInit, OnDestroy } from '@angular/core';
import { Patient } from '../../models/patient';
import { PatientService } from '../../services/patient.service';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UpdatePatientComponent } from '../patient/update-patient/update-patient.component';
import { AddButtunComponent } from '../turn/add/add-buttun/add-buttun.component';
import { Subscription } from 'rxjs';
import { AddDialogPatientComponent } from "../patient/add-dialog-patient/add-dialog-patient.component";

@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatSortModule,
    FormsModule,
    UpdatePatientComponent,
    AddButtunComponent,
    AddDialogPatientComponent
],
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit, OnDestroy {
  public patientList: Patient[] = [];
  public displayedColumns: string[] = ['id', 'firstName', 'lastName', 'age', 'actions'];
  public add: boolean = false;
  public search: string = "";
  public filteredPatients: Patient[] = [];
  private patientUpdateSubscription!: Subscription;

  constructor(private patientService: PatientService, private router: Router) {}

  ngOnInit(): void {
    this.loadPatients();
    this.patientUpdateSubscription = this.patientService.getPatientUpdateListener().subscribe(() => {
      this.loadPatients();
    });
  }

  ngOnDestroy(): void {
    if (this.patientUpdateSubscription) {
      this.patientUpdateSubscription.unsubscribe();
    }
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

  navigateToDeletePatient(id: number): void {
    this.router.navigate([`/delete-patient/${id}`]);
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
