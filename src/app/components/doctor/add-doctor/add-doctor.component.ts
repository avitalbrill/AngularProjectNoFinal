import { Component, OnInit, Output, output } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { DoctorService } from '../../../services/doctor.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { EventEmitter } from 'stream';

@Component({
  selector: 'app-add-doctor',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.css']
})
export class AddDoctorComponent implements OnInit {
  public addDoctor!: FormGroup;
  modalVisible: boolean = false;
  existingDoctorData: any; // Assuming this holds existing doctor data

  constructor(private doctorService: DoctorService, private route: Router, private snackBar: MatSnackBar) { }
//  @Output()
//   public onClick: EventEmitter<> = new EventEmitter<>()
  ngOnInit(): void {
    this.addDoctor = new FormGroup({
      'tz': new FormControl('', [Validators.required, Validators.maxLength(5)]),
      'firstName': new FormControl('', [Validators.required, Validators.maxLength(5)]),
      'lastName': new FormControl('', Validators.required),
      'domain': new FormControl('', Validators.required)
    });
  }

  public save(): void {
    if (this.addDoctor.valid) {
      // this.onSaveEvent.emit(this.addForm.value)
      this.doctorService.addDoctor(this.addDoctor.value).subscribe(() => {
        this.openSnackBar('Doctor added successfully', 'Close');
        location.reload();
      });
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
  openModal() {
    this.modalVisible = true;
    // Initialize the modal form with existing doctor data
    this.addDoctor.patchValue({
      tz: this.existingDoctorData.tz,
      firstName: this.existingDoctorData.firstName,
      lastName: this.existingDoctorData.lastName,
      domain: this.existingDoctorData.domain
    });
}

closeModal() {
    this.modalVisible = false;
}

}
