import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TurnsListComponent } from '../turns-list/turns-list.component';
import { DoctorsListComponent } from '../doctors-list/doctors-list.component';
import { PatientsListComponent } from '../patients-list/patients-list.component';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import {MatTabsModule} from '@angular/material/tabs';


@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule,TurnsListComponent,DoctorsListComponent,PatientsListComponent,MatToolbar,RouterLink,MatTabsModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  showDoctorsList=false;
  showPatientsList=false;
  showTurnsList=false;
  constructor() { }
  showOrNotDoctors():void{
    this.showDoctorsList=!this.showDoctorsList;
  }
  showOrNotPatients():void{
    this.showPatientsList=!this.showPatientsList
  }
  showOrNotTurns():void{
    this.showTurnsList=!this.showTurnsList;
  }

  isListOpen: { [key: string]: boolean } = {
    doctors: false,
    patients: false,
    turns: false
  };

  toggleList(list: string) {
    // אם הרשימה פתוחה, סגור אותה, אחרת פתח אותה
    this.isListOpen[list] = !this.isListOpen[list];
    // עכשיו נסגור את שאר הרשימות
    for (const key in this.isListOpen) {
      if (key !== list) {
        this.isListOpen[key] = false;
      }
    }
  }
}
