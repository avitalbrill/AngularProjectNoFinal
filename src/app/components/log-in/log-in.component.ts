import { CommonModule } from '@angular/common';
// import { User } from '../../Models/user';
import { ReactiveFormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatFormField,MatLabel } from '@angular/material/form-field';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,MatIcon,MatLabel,MatFormField],
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  formLogin!: FormGroup;
  clicked :boolean=false 
  hide = true;
  constructor(  private authService: AuthService,private router:Router) { }

  ngOnInit(): void {
    this.formLogin = new FormGroup({
      password: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required, Validators.maxLength(5)])
    });
  }

  onSubmit() {
    if (this.formLogin.valid) {
      const loginData = this.formLogin.value;
      if (loginData.username === 'admin' && loginData.password === 'password') {
        this.authService.setLoggedIn(true);
      } else {
        console.error('Invalid credentials');
        this.authService.setLoggedIn(false);
      }
    } else {
      console.error('Form is invalid');
      this.authService.setLoggedIn(false);
    }
    //  this.router.navigate(['/homepage']);
  }

  isLoggedIn2(): boolean {
    return this.authService.isLoggedIn2();
  }
}