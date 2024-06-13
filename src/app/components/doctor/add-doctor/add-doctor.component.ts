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
import { DoctorService } from '../../../services/doctor.service';
import { Doctor } from '../../../models/doctor';
//import { DialogData } from '../update-doctor-dialog/update-doctor-dialog.component';



export interface DialogData {
  firstName: string;
  lastName: string;
  domain:string;
  animal:string;
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
  templateUrl: './add-doctor.component.html',
  styleUrl: './add-doctor.component.css'
})

export class AddDoctorComponent {

  public doctorForm!:FormGroup
  doctor!:Doctor

  constructor(
    public dialogRef: MatDialogRef<AddDoctorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  private _doctorService:DoctorService,private route:Router) {}

 
  onNoClick(): void {
    this.dialogRef.close();this.route.navigate(['/doctors'])

  }
  ngOnInit():void{
    // this.route.navigate(['/doctor/add'])
    this.doctorForm=new FormGroup({
      "firstName":new FormControl("",[Validators.required]),
      "lastName":new FormControl("",[Validators.required]),
      "domain":new FormControl("",[Validators.required]),
    })
  }
  save() {
    if (this.doctorForm.valid) {
      this.doctor = this.doctorForm.value;
      location.reload();
      console.log("Form Data: ", this.doctorForm.value);
      console.log("doctor",this.doctor);
      
      this._doctorService.addDoctor(this.doctor).subscribe({
        next: (response) => {
          console.log('Doctor saved successfully:', response);
          this.route.navigate(['/doctors']);
        },
        
      });
    } 
}
}