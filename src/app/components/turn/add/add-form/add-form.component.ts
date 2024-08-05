import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogContent, MatDialogClose } from '@angular/material/dialog';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Doctor } from '../../../../models/doctor';
import { Patient } from '../../../../models/patient';
import { Turn } from '../../../../models/turn';
import { DoctorService } from '../../../../services/doctor.service';
import { PatientService } from '../../../../services/patient.service';
import { TurnService } from '../../../../services/turn.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogActions } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { log } from 'console';

export interface DialogData {
  date: Date;
  hour: number;
  treatmentDuration: number;
  patientId: number;
  doctorId: number;
  animal: string;
}

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogActions,
    MatDialogContent,
    ReactiveFormsModule,
    MatDialogClose,
    FormsModule,
    CommonModule,
  ]
})
export class AddFormComponent implements OnInit {

  public turnForm!: FormGroup;
  public doctors: Doctor[] = [];
  public patients: Patient[] = [];
  turn!: Turn;

  constructor(
    public dialogRef: MatDialogRef<AddFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _turnService: TurnService,
    private _doctorService: DoctorService,
    private _patientService: PatientService,
    private route: Router
  ) { }
  ngOnInit(): void {
    console.log("initform");
    
    this.turnForm = new FormGroup({
      date: new FormControl(null, [Validators.required,this.validateDate]),
      hour: new FormControl(null, [Validators.required,Validators.min(8), Validators.max(22)]),
      treatmentDuration: new FormControl(null, [Validators.required]),
      doctorId: new FormControl(null, [Validators.required,this.validateDoctorId.bind(this)]),
      patientId: new FormControl(null, [Validators.required,this.validatePatientId.bind(this)])
    });

    this.loadDoctors();
    this.loadPatients();
  }
  validateDoctorId(control: FormControl): { [s: string]: boolean } | null {
    if (!this.doctors.some(doctor => doctor.id === control.value)) {
      return { 'invalidDoctorId': true };
    }
    return null;
  }

  validatePatientId(control: FormControl): { [s: string]: boolean } | null {
    if (!this.patients.some(patient => patient.id === control.value)) {
      return { 'invalidPatientId': true };
    }
    return null;
  }


  validateDate(control: FormControl): { [s: string]: boolean } | null {
    const inputDate = new Date(control.value);
    const today = new Date();
    if (inputDate < today) {
      return { 'invalidDate': true };
    }
    return null;
  }

  loadDoctors() {
    this._doctorService.getAllDoctors().subscribe({
      next: (doctors) => {
        this.doctors = doctors;
        console.log("doctors", this.doctors);

      },
      error: (error) => {
        console.error('Failed to load doctors', error);
      }
    });
  }

  loadPatients() {
    this._patientService.getAllPatients().subscribe({
      next: (patients) => {
        this.patients = patients;
        console.log("patients", this.patients);

      },
      error: (error) => {
        console.error('Failed to load patients', error);
      }
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
    console.log("close");

    // this.route.navigate(['/turn']);
  }


  save() {
    console.log("addTurn",this.turnForm.value);
    
    if (this.turnForm.valid) {
      this.turn = this.turnForm.value;
      this._turnService.addTurn(this.turn).subscribe({
        next: (response) => {
          console.log('Turn saved successfully:', response);
          this.dialogRef.close();  // סוגר את הדיאלוג אחרי השמירה
          this.route.navigate(['/turn']);
          
        },
        error: (error) => {
          console.error('Failed to save turn', error);
        }
      });
    } else {
      console.error('Form is invalid');
    }
  }
  

  // save() {

  //   console.log("formSaveTurn", this.turnForm.value);

  //   if (this.turnForm.valid) {
  //     this.turn = this.turnForm.value;
  //     console.log('Form Data: ', this.turnForm.value);
  //     console.log('Turn:', this.turn);

  //     this._turnService.addTurn(this.turn).subscribe({
  //       next: (response) => {
  //         console.log('Turn saved successfully:', response);
  //         this.route.navigate(['/turn']);
  //       },
  //       error: (error) => {
  //         console.error('Failed to save turn', error);
  //       }
  //     });
  //   }
  // }
}
