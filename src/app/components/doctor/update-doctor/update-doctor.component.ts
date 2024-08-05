import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DoctorService } from '../../../services/doctor.service';
import { Doctor } from '../../../models/doctor';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-update-doctor',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatIconModule, MatTableModule, MatButtonModule],
  templateUrl: './update-doctor.component.html',
  styleUrls: ['./update-doctor.component.css']
})
export class UpdateDoctorComponent implements OnInit {
  update: boolean = false;
  public doctorForm!: FormGroup;
  formVisible: boolean = false; // Initial state set to false
  @Input() id!: number;
  @Input() doctor!: Doctor;
  @Output() doctorSave: EventEmitter<Doctor> = new EventEmitter<Doctor>();

  constructor(private doctorService: DoctorService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.doctorForm = new FormGroup({
      firstName: new FormControl(this.doctor?.firstName || '', Validators.required),
      lastName: new FormControl(this.doctor?.lastName || '', Validators.required),
      domain: new FormControl(this.doctor?.domain || '', [
        Validators.required, 
        Validators.minLength(2)
      ])
    });
  }

  toggleForm(): void {
    this.formVisible = !this.formVisible;
    if (this.formVisible) {
      this.loadDoctorData(this.id);
    }
  }

  loadDoctorData(id: number): void {
    this.doctorService.getDoctorById(id).subscribe({
      next: (res: Doctor) => {
        this.doctorForm.patchValue({
          firstName: res.firstName,
          lastName: res.lastName,
          domain: res.domain
        });
      },
      error: (err) => console.error(err)
    });
  }

  save(): void {
    if (this.doctorForm.valid) {
      const updatedDoctor = {
        ...this.doctor,
        ...this.doctorForm.value
      };
      this.doctorService.updateDoctor(this.doctor.id, updatedDoctor).subscribe({
        next: () => {
          console.log('Doctor updated successfully');
          this.doctorSave.emit(updatedDoctor);
          this.doctorForm.reset(); // Clear the form after saving
          this.formVisible = false; // Close the form after saving
          this.snackBar.open('Doctor updated successfully!', 'Close', { duration: 2000 });
        },
        error: (err) => console.error(err)
      });
    }
  }
}
