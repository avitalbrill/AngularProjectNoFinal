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


export const routes:Routes=[
    { path: 'patients',component:PatientsListComponent },
    { path: 'doctors' , component:DoctorsListComponent},
    { path: 'turns' ,component:TurnsListComponent}, 
    { path: 'delete-doctor/:id' ,component:DeleteDoctorComponent}, 
    { path: 'update-doctor/:id' ,component:UpdateDoctorComponent}, 
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

