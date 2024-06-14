import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';
import { Turn } from '../../models/turn';
import { TurnService } from '../../services/turn.service';
import { DoctorService } from '../../services/doctor.service';
import { PatientService } from '../../services/patient.service';
import { Doctor } from '../../models/doctor';
import { Patient } from '../../models/patient';
import { UpdateTurnComponent } from '../turn/update-turn/update-turn.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddDialogTurnComponent } from '../turn/add-dialog-turn/add-dialog-turn.component';

@Component({
  selector: 'app-turns-list',
  standalone: true,
  imports: [CommonModule,MatIconModule,MatTableModule,MatButtonModule,UpdateTurnComponent,ReactiveFormsModule,AddDialogTurnComponent],
  templateUrl: './turns-list.component.html',
  styleUrl: './turns-list.component.css'
})
export class TurnsListComponent implements OnInit{

  turn!:Turn
  public turnList:Turn[]=[];
  public displayedColumns: string[] = ['date', 'hour','treatmentDuration', 'doctorName','patientName', 'actions'];
  public add: boolean = false;
  flag!:boolean
  doctorList: Doctor[] = [];
  patientList: Patient[] = [];
  doctorMap: Map<number| undefined, Doctor> = new Map();
  patientMap: Map<number, Patient> = new Map();

  constructor(private turnService:TurnService, private doctorService: DoctorService,
    private patientService: PatientService  ){}


  loadTurns(): void {
    this.turnService.getAllTurns().subscribe({
      next: (res) => {
        this.turnList = res;
        console.log("turn",this.turnList);
        
      },
      error: (err) => {
        console.error('Failed to fetch turns:', err);
      }
    });
  }

  loadDoctors(): void {
    this.doctorService.getAllDoctors().subscribe({
      next: (res) => {
        this.doctorMap = new Map(res.map(doctor => [doctor.id, doctor]));
      },
      error: (err) => {
        console.error('Failed to fetch doctors:', err);
      }
    });
  }

  loadPatients(): void {
    this.patientService.getAllPatients().subscribe({
      next: (res) => {
        this.patientMap = new Map(res.map(patient => [patient.id, patient]));
      },
      error: (err) => {
        console.error('Failed to fetch patients:', err);
      }
    });
  }
  ngOnInit(): void {
    this.loadTurns();
    this.loadDoctors();
    this.loadPatients();
  }

  getDoctorName(doctorId: number): string {
    const doctor = this.doctorMap.get(doctorId);
    return doctor ? `${doctor.firstName} ${doctor.lastName}` : '';
  }

  getPatientName(patientId: number): string {
    const patient = this.patientMap.get(patientId);
    return patient ? `${patient.firstName} ${patient.lastName}` : '';
  }

  showPost(){
    this.flag=true
  }

  // updateClick(turn : any){
  //   console.log("update Turn");
  //  this.turnService.updateTurn(turn.id,turn);
  // }

  addTurn(): void {
    this.add = true;
    console.log("Add Turn");
  }

  saveEditTurn(turn: Turn): void {
    this.turnService.updateTurn(turn.id!, turn).subscribe({
      next: () => {
        console.log("turn updated successfully");
        this.loadTurns();
      },
      error: (err) => {
        console.error('Failed to update turn:', err);
      }
    });
  }

  deleteTurn(turn: Turn): void {
    const confirmation = confirm(`Are you sure you want to delete ${turn.date} ?`);
    if (confirmation) {
      this.turnService.deleteTurn(turn.id!).subscribe({
        next: () => {
          this.turnList = this.turnList.filter(d => d.id !== turn.id);
          console.log('Turn deleted successfully');
        },
        error: (err) => {
          console.error('Failed to delete turn:', err);
        }
      });
    }
  }
}

