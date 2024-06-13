import { Component, TemplateRef, ViewChild, viewChild } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { DoctorsListComponent } from './components/doctors-list/doctors-list.component';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './components/home-page/home-page.component';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { UpdateDoctorComponent } from './components/doctor/update-doctor/update-doctor.component';
import { AddPatientComponent } from './components/patient/add-patient/add-patient.component';
import { AddDoctorComponent } from './components/doctor/add-doctor/add-doctor.component';
import { AddTurnComponent } from './components/turn/add-turn/add-turn.component';
import { AuthService } from './services/auth.service';
import { LogInComponent } from './components/log-in/log-in.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule,RouterModule,HomePageComponent,MatSlideToggle,UpdateDoctorComponent,AddPatientComponent,AddDoctorComponent,AddTurnComponent,LogInComponent,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'clinic-project';
  public formLogin!: FormGroup;
  @ViewChild('loginDialog') loginDialog!: TemplateRef<any>;
  constructor(private authService:AuthService,private fb: FormBuilder, private dialog: MatDialog) {
    this.formLogin = this.fb.group({
      password: ['', Validators.required],
      username: ['', [Validators.required, Validators.maxLength(5), Validators.minLength(5)]]
    });
  }
  isLoggedIn() {
    return this.authService.isLoggedIn2();
  }

  openLoginDialog() {
    this.dialog.open(this.loginDialog, {
      width: '400px'
    });
  }

  onSubmit() {
    if (this.formLogin.valid) {
      // Handle the login logic here
      console.log('Login Successful');
      this.dialog.closeAll();
    }
  }

  onCancel() {
    this.dialog.closeAll();
  }
}