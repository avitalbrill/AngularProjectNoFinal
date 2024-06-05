import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Doctor } from '../../models/doctor';
import { DoctorService } from '../../services/doctor.service';
import { Route, RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { DeleteDoctorComponent } from '../doctor/delete-doctor/delete-doctor.component';
import { UpdateDoctorComponent } from '../doctor/update-doctor/update-doctor.component';

@Component({
  selector: 'app-doctors-list',
  standalone: true,
  imports: [CommonModule,RouterModule,DeleteDoctorComponent,UpdateDoctorComponent],
  templateUrl: './doctors-list.component.html',
  styleUrl: './doctors-list.component.css'
})
export class DoctorsListComponent implements OnInit{
public doctorsList!:Doctor[];

constructor(private _doctorService: DoctorService,private router:Router)
{}
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
  
  delete(doctor:Doctor)
  {
    this.router.navigate(['/delete-doctor',doctor.id])
  }
  update(doctor:Doctor)
  {
    this.router.navigate(['/update-doctor',doctor.id])
  }
}
