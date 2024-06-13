import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Doctor } from '../../models/doctor';
import { DoctorService } from '../../services/doctor.service';
import { Route, RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { DeleteDoctorComponent } from '../doctor/delete-doctor/delete-doctor.component';
import { UpdateDoctorComponent } from '../doctor/update-doctor/update-doctor.component';
import { AvitalPipe } from '../../avital.pipe';

import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';
import { AddDialogDoctorComponent } from '../doctor/add-dialog-doctor-component/add-dialog-doctor-component.component';

@Component({
  selector: 'app-doctors-list',
  standalone: true,
  imports: [CommonModule, RouterModule, DeleteDoctorComponent, UpdateDoctorComponent, AvitalPipe, MatTableModule, MatIconModule, MatButtonModule, MatSortModule,AddDialogDoctorComponent],
  templateUrl: './doctors-list.component.html',
  styleUrls: ['./doctors-list.component.css']
})
export class DoctorsListComponent implements OnInit {
  public doctorsList: Doctor[] = []; // הגדרת המשתנה doctorList כמערך ריק כברירת מחדל
  public displayedColumns: string[] = ['firstName', 'lastName', 'domain', 'actions'];
  public add: boolean = false;
  public isClicked: boolean = false;
  public isAdd: boolean = false;
  public isDelete: boolean = false;
  public selectedDoctor!: Doctor;

  constructor(private _doctorService: DoctorService, private router: Router) {}

  ngOnInit(): void {
    this._doctorService.getAllDoctors().subscribe({
      next: (res) => {
        this.doctorsList = res;
      },
      error: (err) => {
        console.error('Error fetching doctors', err);
      }
    });
  }

  // addDoctor() {
  //   this.add = true;
  //   console.log("add");
  // }

  delete(doctor: Doctor) {
    const confirmation = confirm(`Are you sure you want to delete ${doctor.firstName} ${doctor.lastName}?`);
    if (confirmation) {
      this._doctorService.deleteDoctor(doctor.id).subscribe({
        next: () => {
          this.doctorsList = this.doctorsList.filter(d => d.id !== doctor.id);
          console.log('Doctor deleted successfully');
        },
        error: (err) => {
          console.error('Failed to delete doctor:', err);
        }
      });
    }
  }

  saveEditDoctor(doctor: Doctor) {
    this._doctorService.updateDoctor(doctor.id,doctor).subscribe({
      next: () => console.log('Doctor updated successfully'),
      error: (err) => console.error('Failed to update doctor:', err)
    });
  }

  updateDoctor(doctor: Doctor) {
    this.router.navigate(['/update-doctor', doctor.id]);
  }
  o(event:any){
    this.isClicked=event;
  }
}
