import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { DoctorsListComponent } from './components/doctors-list/doctors-list.component';
import { CommonModule } from '@angular/common';
import { TurnsListComponent } from './components/turns-list/turns-list.component';
import { PatientsListComponent } from './components/patients-list/patients-list.component';
import { BrowserModule } from '@angular/platform-browser';
import { DoctorPageComponent } from './components/doctor-page/doctor-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,DoctorsListComponent,CommonModule,TurnsListComponent,PatientsListComponent,RouterModule,DoctorPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'clinic-project';
  showDoctorsList=false;
  showPatientsList=false;
  showTurnsList=false;
  constructor(private router: Router) { }
  navigateToDoctorPage():void{
    this.router.navigate(['/doctor-page']);
  }
  showOrNotDoctors():void{
    this.showDoctorsList=!this.showDoctorsList;
  }
  showOrNotPatients():void{
    this.showPatientsList=!this.showPatientsList
  }
  showOrNotTurns():void{
    this.showTurnsList=!this.showTurnsList;
  }
}
