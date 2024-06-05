import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorsListComponent } from './components/doctors-list/doctors-list.component';
import { PatientsListComponent } from './components/patients-list/patients-list.component';
import { TurnsListComponent } from './components/turns-list/turns-list.component';
import { AppComponent } from './app.component';
import { DoctorPageComponent } from './components/doctor-page/doctor-page.component';


export const routes:Routes=[
    { path: 'patients-list',component:PatientsListComponent },
    { path: 'doctors-list' , component:DoctorsListComponent},
    { path: 'turns-list' ,component:TurnsListComponent}, 
    { path: 'doctor-page', component: DoctorPageComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' }, 
    { path: 'home' ,component:AppComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

