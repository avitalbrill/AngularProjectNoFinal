import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';
import { PatientService } from '../../../services/patient.service';
import { Patient } from '../../../models/patient';

@Component({
  selector: 'app-update-patient',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatIconModule, MatTableModule, MatButtonModule, MatSortModule],
  templateUrl: './update-patient.component.html',
  styleUrls: ['./update-patient.component.css']
})
export class UpdatePatientComponent implements OnInit {
  update: boolean = false;
  public patientForm!: FormGroup;
  formVisible: boolean = false; // Initial state set to false
  @Input() id!: number;
  @Output() updateComplete: EventEmitter<any> = new EventEmitter<any>();

  constructor(private route: ActivatedRoute, private patientService: PatientService) {}

  ngOnInit(): void {
    this.patientForm = new FormGroup({
      tz: new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      age: new FormControl('', [Validators.required, Validators.minLength(1)])
    });
  }

  toggleForm(): void {
    this.formVisible = !this.formVisible;
    if (this.formVisible) {
      this.loadPatientData(this.id);
    }
  }

  loadPatientData(id: number): void {
    this.patientService.getPatientById(id).subscribe({
      next: (res: Patient) => {
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
      const updatePatient: Patient = {
        id: this.id,
        ...this.patientForm.value
      };
      this.patientService.updatePatient(this.id, updatePatient).subscribe({
        next: () => {
          console.log('Patient updated successfully');
          this.updateComplete.emit();
          this.patientForm.reset(); // Clear the form after saving
          this.formVisible = false; // Close the form after saving
          this.reloadPage(); // Reload the page to see the updated results
        },
        error: (err) => console.error(err)
      });
    }
  }

  reloadPage() {
    // פעולה לטעינת הדף מחדש
    location.reload();
  }
}
