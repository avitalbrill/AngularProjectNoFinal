import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorsListComponent } from './components/doctors-list/doctors-list.component';
import { PatientsListComponent } from './components/patients-list/patients-list.component';
import { TurnsListComponent } from './components/turns-list/turns-list.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DeleteDoctorComponent } from './components/doctor/delete-doctor/delete-doctor.component';
import { Doctor } from './models/doctor';
import { UpdateDoctorComponent } from './components/doctor/update-doctor/update-doctor.component';
import { AddPatientComponent } from './components/patient/add-patient/add-patient.component';
import { AddDoctorComponent } from './components/doctor/add-doctor/add-doctor.component';
import { AddTurnComponent } from './components/turn/add-turn/add-turn.component';
import { DeletePatientComponent } from './components/patient/delete-patient/delete-patient.component';
import { UpdatePatientComponent } from './components/patient/update-patient/update-patient.component';
import { DeleteTurnComponent } from './components/turn/delete-turn/delete-turn.component';
import { UpdateTurnComponent } from './components/turn/update-turn/update-turn.component';


export const routes:Routes=[
    { path: 'patients',component:PatientsListComponent },
    { path: 'doctors' , component:DoctorsListComponent},
    { path: 'turns' ,component:TurnsListComponent}, 
    { path: 'delete-doctor/:id' ,component:DeleteDoctorComponent}, 
    { path: 'update-doctor/:id' ,component:UpdateDoctorComponent},
    { path: 'delete-patient/:id' ,component:DeletePatientComponent}, 
    { path: 'update-patient/:id' ,component:UpdatePatientComponent}, 
    { path: 'delete-turn/:id' ,component:DeleteTurnComponent}, 
    { path: 'update-turn/:id' ,component:UpdateTurnComponent},
    { path: 'add-patient' ,component:AddPatientComponent}, 
    { path: 'add-doctor' ,component:AddDoctorComponent}, 
    { path: 'add-turn' ,component:AddTurnComponent}, 
    { path: '', redirectTo: 'stam', pathMatch: 'full' },
    

   
];

@NgModule({
  imports: [RouterModule.forRoot(routes), MatSlideToggleModule,BrowserModule,ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }

