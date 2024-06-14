import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DoctorService } from '../../../services/doctor.service';
import { Doctor } from '../../../models/doctor';
import { ActivatedRoute } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-update-doctor',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatIconModule, MatTableModule, MatButtonModule, MatSortModule],
  templateUrl: './update-doctor.component.html',
  styleUrls: ['./update-doctor.component.css']
})
export class UpdateDoctorComponent implements OnInit {
  update: boolean = false;
  public doctorForm!: FormGroup;
  formVisible: boolean = false; // Initial state set to false
  @Input() id!: number;
  @Output() updateComplete: EventEmitter<any> = new EventEmitter<any>();

  constructor(private route: ActivatedRoute, private doctorService: DoctorService) {}

  ngOnInit(): void {
    this.doctorForm = new FormGroup({
      tz: new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      domain: new FormControl('', [Validators.required, Validators.minLength(10)])
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
        this.doctorForm.setValue({
          tz: res.tz,
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
      const updatedDoctor: Doctor = {
        id: this.id,
        ...this.doctorForm.value
      };
      this.doctorService.updateDoctor(this.id, updatedDoctor).subscribe({
        next: () => {
          console.log('Doctor updated successfully');
          this.updateComplete.emit();
          this.doctorForm.reset(); // Clear the form after saving
          this.formVisible = false; // Close the form after saving
          // this.reloadPage(); // Reload the page to see the updated results
        },
        error: (err) => console.error(err)
      });
    }
  }

  reloadPage() {
    // פעולה לטעינת הדף מחדש
  //   location.reload();
  }
}
