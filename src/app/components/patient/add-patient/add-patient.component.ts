import {Component, Inject} from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose, 
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {FormControl, FormGroup, FormsModule, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { Patient } from '../../../models/patient';
import { PatientService } from '../../../services/patient.service';

export interface DialogData {
  firstName: string;
  lastName: string;
  age:number;

}

@Component({
  selector: 'app-form-add',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    ReactiveFormsModule
  ],
  // imports: [FormsModule,CommonModule,MatInputModule,MatFormFieldModule,MatDialogActions,MatDialogContent],
  templateUrl: './add-patient.component.html',
  styleUrl: './add-patient.component.css'
})

export class AddPatientComponent {

  public patientForm!:FormGroup
  patient!:Patient

  constructor(
    public dialogRef: MatDialogRef<AddPatientComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  private _patientService:PatientService,private route:Router) {}

 
  onNoClick(): void {
    this.dialogRef.close();this.route.navigate(['/patients'])

  }
  ngOnInit():void{
    this.patientForm=new FormGroup({
      "firstName":new FormControl("",[Validators.required]),
      "lastName":new FormControl("",[Validators.required]),
      "age":new FormControl("",[Validators.required]),
    })
  }
  save() {
    if (this.patientForm.valid) {
      this.patient = this.patientForm.value;
      console.log("Form Data: ", this.patientForm.value);
      console.log("patient",this.patient);
      this._patientService.addPatient(this.patient).subscribe({
        next: (response) => {
          console.log('Patient saved successfully:', response);
          this.route.navigate(['/patients']);
        },
      });
    } 
  }
}