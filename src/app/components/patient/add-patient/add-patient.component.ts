import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators ,ReactiveFormsModule} from '@angular/forms';
import { PatientService } from '../../../services/patient.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-add-patient',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css']
})
export class AddPatientComponent implements OnInit {
  public addPatient!: FormGroup;

  constructor(private patientService: PatientService,private route:Router,private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    //  this.route.navigate(['/add-patient'])
     this.addPatient = new FormGroup({
      'tz': new FormControl('', [Validators.required, Validators.maxLength(5)]),
      'firstName': new FormControl('', [Validators.required, Validators.maxLength(5)]),
      'lastName': new FormControl('', Validators.required),
      'age': new FormControl(null, Validators.required)
    });
  }

  public save(): void {
    // this.patientService.addPatient(this.addPatient.value).subscribe();
      this.patientService.addPatient(this.addPatient.value).subscribe(() => {
        this.openSnackBar('Patient added successfully', 'Close');
      });
    }
    
    
    openSnackBar(message: string, action: string) {
      this.snackBar.open(message, action, {
        duration: 2000, // זמן הצגת ההודעה במילישניות
      });
    }
    
}