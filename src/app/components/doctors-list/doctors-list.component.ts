import { CommonModule } from '@angular/common';
import { Component, OnInit,EventEmitter, Output } from '@angular/core';
import { Doctor } from '../../models/doctor';
import { DoctorService } from '../../services/doctor.service';
import { Route, RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { DeleteDoctorComponent } from '../doctor/delete-doctor/delete-doctor.component';
import { UpdateDoctorComponent } from '../doctor/update-doctor/update-doctor.component';
import { AvitalPipe } from '../../avital.pipe';
import { AddDoctorComponent } from '../doctor/add-doctor/add-doctor.component';


@Component({
  selector: 'app-doctors-list',
  standalone: true,
  imports: [CommonModule,RouterModule,DeleteDoctorComponent,UpdateDoctorComponent,AvitalPipe,AddDoctorComponent,DeleteDoctorComponent],
  templateUrl: './doctors-list.component.html',
  styleUrl: './doctors-list.component.css'
})
export class DoctorsListComponent implements OnInit{
public doctorsList!:Doctor[];
public isClicked :boolean=false;
public isAdd:boolean=false;
public isDelete:boolean=false;
public selectedDoctor!:Doctor


// @Output()
// public onDelete: EventEmitter<Doctor>=new EventEmitter<Doctor>

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
    // this.isDelete=!this.isDelete
    // this.selectedDoctor=doctor
    this.router.navigate(['/delete-doctor',doctor.id])
  }

}