import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';
import { UpdateTurnComponent } from '../turn/update-turn/update-turn.component';
import { Turn } from '../../models/turn';
import { TurnService } from '../../services/turn.service';
import { DoctorService } from '../../services/doctor.service';
import { PatientService } from '../../services/patient.service';
import { Doctor } from '../../models/doctor';
import { Patient } from '../../models/patient';
import { AddButtunComponent } from '../turn/add/add-buttun/add-buttun.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-turn-list',
  standalone: true,
  imports: [
    CommonModule,
    UpdateTurnComponent,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    AddButtunComponent,
  ],
  templateUrl: './turn-list.component.html',
  styleUrls: ['./turn-list.component.css']
})
export class TurnListComponent implements OnInit, OnDestroy {
  public turnList: Turn[] = [];
  public displayedColumns: string[] = ['id', 'date', 'hour', 'treatmentDuration', 'doctorName', 'patientName', 'actions'];
  public add: boolean = false;
  flag!: boolean;
  doctorList: Doctor[] = [];
  patientList: Patient[] = [];
  doctorMap: Map<number | undefined, Doctor> = new Map();
  patientMap: Map<number, Patient> = new Map();
  private turnUpdateSubscription!: Subscription;

  constructor(
    private turnService: TurnService,
    private doctorService: DoctorService,
    private patientService: PatientService
  ) { }

  ngOnInit(): void {
    this.loadTurns();
    this.loadDoctors();
    this.loadPatients();
    this.turnUpdateSubscription = this.turnService.getTurnUpdateListener().subscribe(() => {
      this.loadTurns();
    });
  }

  ngOnDestroy(): void {
    if (this.turnUpdateSubscription) {
      this.turnUpdateSubscription.unsubscribe();
    }
  }

  loadTurns(): void {
    this.turnService.getAllTurns().subscribe({
      next: (res) => {
        this.turnList = res;
        console.log("turnList", this.turnList);
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

  getDoctorName(doctorId: number): string {
    const doctor = this.doctorMap.get(doctorId);
    return doctor ? `${doctor.firstName} ${doctor.lastName}` : '';
  }

  getPatientName(patientId: number): string {
    const patient = this.patientMap.get(patientId);
    return patient ? `${patient.firstName} ${patient.lastName}` : '';
  }

  showPost() {
    this.flag = true;
  }

  addTurn(): void {
    this.add = true;
    console.log("Add Turn");
  }

  saveEditTurn(turn: Turn): void {
    this.turnService.updateTurn(turn.id!, turn).subscribe({
      next: () => {
        console.log("Turn updated successfully");
        this.loadTurns();
      },
      error: (err) => {
        console.error('Failed to update turn:', err);
      }
    });
  }

  deleteTurn(turn: Turn): void {
    const confirmation = confirm(`Are you sure you want to delete ${turn.date}?`);
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
