import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../../services/doctor.service';
import { ActivatedRoute } from '@angular/router';
import { Doctor } from '../../../models/doctor';
import { DoctorsListComponent } from '../../doctors-list/doctors-list.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delete-doctor',
  standalone: true,
  imports: [DoctorsListComponent,CommonModule],
  templateUrl: './delete-doctor.component.html',
  styleUrl: './delete-doctor.component.css'
})
export class DeleteDoctorComponent implements OnInit {
  // public doctor!: Doctor
  private id!: number

 constructor(private route: ActivatedRoute,private doctorService:DoctorService)
 {}
  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      this.id = param['id']
      this.doctorService.deleteDoctor(this.id).subscribe({
        // next: (res) => {
        //   this.doctor = res;
        // }
      })
    });
  }}
