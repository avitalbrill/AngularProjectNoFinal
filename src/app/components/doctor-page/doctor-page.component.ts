import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DoctorsListComponent } from '../doctors-list/doctors-list.component';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-doctor-page',
  standalone: true,
  imports: [CommonModule,DoctorsListComponent,RouterModule],
  templateUrl: './doctor-page.component.html',
  styleUrl: './doctor-page.component.css'
})
export class DoctorPageComponent {
  showDoctorsList = false;
  constructor(private router: Router) { }
toggleList(): void {
  this.showDoctorsList = !this.showDoctorsList;
 }
 navigateToDoctorsList():void{
  this.router.navigate(['/doctors-list']);
 }
 showOrNot(): void {
  this.showDoctorsList = !this.showDoctorsList;
}
}

