import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { DoctorsListComponent } from './components/doctors-list/doctors-list.component';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './components/home-page/home-page.component';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { UpdateDoctorComponent } from './components/doctor/update-doctor/update-doctor.component';
import { AddPatientComponent } from './components/patient/add-patient/add-patient.component';
import { AddDoctorComponent } from './components/doctor/add-doctor/add-doctor.component';
import { AddTurnComponent } from './components/turn/add-turn/add-turn.component';
import { LogInComponent } from './log-in/log-in/log-in.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule,RouterModule,HomePageComponent,MatSlideToggle,UpdateDoctorComponent,AddPatientComponent,AddDoctorComponent,AddTurnComponent,LogInComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'clinic-project';
}