import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TurnsListComponent } from '../turns-list/turns-list.component';
import { DoctorsListComponent } from '../doctors-list/doctors-list.component';

import { MatToolbar } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import {MatTabsModule} from '@angular/material/tabs';
import { PatientsListComponent } from '../patients-list/patients-list.component';


@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule,MatToolbar,RouterLink],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
}
