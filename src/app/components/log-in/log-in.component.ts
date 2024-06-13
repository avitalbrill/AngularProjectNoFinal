import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent implements OnInit{
  
    public formLogin!: FormGroup;
  
    constructor(private authService: AuthService) { }
    
  
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
    }
  
    isLoggedIn2(): boolean {
      return this.authService.isLoggedIn2();
    }
}
