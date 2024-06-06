import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PatientService } from '../../../services/patient.service';
import { Patient } from '../../../models/patient';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-patient',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './update-patient.component.html',
  styleUrls: ['./update-patient.component.css']
})
export class UpdatePatientComponent implements OnInit {
  private id!: number;
  public patientForm!: FormGroup;

  constructor(private route: ActivatedRoute, private patientService: PatientService) {}

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      this.id = param['id'];
      this.loadPatientData(this.id);
    });

    this.patientForm = new FormGroup({
      tz: new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      age: new FormControl('', [Validators.required, Validators.min(0)])
    });
  }

  loadPatientData(id: number): void {
    this.patientService.getPatientById(id).subscribe({
      next: (res) => {
        this.patientForm.setValue({
          tz: res.tz,
          firstName: res.firstName,
          lastName: res.lastName,
          age: res.age
        });
      },
      error: (err) => console.error(err)
    });
  }

  save(): void {
    if (this.patientForm.valid) {
      const updatedPatient: Patient = {
        id: this.id,
        ...this.patientForm.value
      };
      this.patientService.updatePatient(this.id, updatedPatient).subscribe({
        next: () => console.log('Patient updated successfully'),
        error: (err) => console.error(err)
      });
    }
  }
}
