import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Patient } from '../../models/patient';
import { PatientService } from '../../services/patient.service';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patients-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.css']
})
export class PatientsListComponent implements OnInit {
  public patientsList!: Patient[];

  constructor(private patientService: PatientService, private router: Router) {}

  ngOnInit(): void {
    this.patientService.getAllPatients().subscribe({
      next: (res) => {
        this.patientsList = res;
      },
      error: (err) => {
        console.error('Error fetching patients', err);
      }
    });
  }

  delete(patient: Patient): void {
    this.router.navigate(['/delete-patient', patient.id]);
  }

  update(patient: Patient): void {
    this.router.navigate(['/update-patient', patient.id]);
  }
}
