import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Patient } from '../../models/patient';
import { PatientService } from '../../services/patient.service';

@Component({
  selector: 'app-patients-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './patients-list.component.html',
  styleUrl: './patients-list.component.css'
})
export class PatientsListComponent implements OnInit{
  public patientsList!:Patient[];
  constructor(private _patientService :PatientService){}
  ngOnInit(): void {
    this._patientService.getAllPatients().subscribe({
      next:(res)=>{
        this.patientsList=res;
      }
    })
  }

}
