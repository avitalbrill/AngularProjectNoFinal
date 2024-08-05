import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Turn } from '../../../models/turn';
import { Doctor } from '../../../models/doctor';
import { Patient } from '../../../models/patient';
import { DoctorService } from '../../../services/doctor.service';
import { PatientService } from '../../../services/patient.service';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { log } from 'console';

@Component({
  selector: 'app-update-turn',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, MatIconModule,MatSelectModule,MatOptionModule,MatButtonModule],
  templateUrl: './update-turn.component.html',
  styleUrls: ['./update-turn.component.css']
})
export class UpdateTurnComponent implements OnInit {
  update: boolean = false;
  doctorList: Doctor[] = [];
  filteredDoctors: Doctor[] = [];
  patientList: Patient[] = [];
  filteredPatients: Patient[] = [];
  doctorFilter: string = '';
  patientFilter: string = '';
  public turnForm!: FormGroup;
  @Input() public turn!: Turn;
  @Output() public turnSave: EventEmitter<Turn> = new EventEmitter<Turn>();

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private doctorService: DoctorService,
    private patientService: PatientService
  ) {}

  ngOnInit(): void {
    this.loadDoctors();
    this.loadPatients();

    this.turnForm = new FormGroup({
      'date': new FormControl(this.turn?.date, [Validators.required, Validators.maxLength(50)]),
      'hour': new FormControl(this.turn?.hour, Validators.required),
      'treatmentDuration': new FormControl(this.turn?.treatmentDuration, Validators.required),
      'doctorId': new FormControl(this.turn?.doctorId, Validators.required),
      'patientId': new FormControl(this.turn?.patientId, Validators.required)
    });
  }

  loadDoctors(): void {
    this.doctorService.getAllDoctors().subscribe({
      next: (res) => {
        this.doctorList = res;
        this.filteredDoctors = this.doctorList;
      },
      error: (err) => {
        console.error('Failed to fetch doctors:', err);
      }
    });
  }

  loadPatients(): void {
    this.patientService.getAllPatients().subscribe({
      next: (res) => {
        this.patientList = res;
        this.filteredPatients = this.patientList;
      },
      error: (err) => {
        console.error('Failed to fetch patients:', err);
      }
    });
  }

  
  filterDoctors(filterValue: string): void {
    this.filteredDoctors = this.doctorList.filter(doctor =>
      doctor.firstName.toLowerCase().includes(filterValue.toLowerCase()) ||
      doctor.lastName.toLowerCase().includes(filterValue.toLowerCase())
    );
  }

  filterPatients(filterValue: string): void {
    this.filteredPatients = this.patientList.filter(patient =>
      patient.firstName.toLowerCase().includes(filterValue.toLowerCase()) ||
      patient.lastName.toLowerCase().includes(filterValue.toLowerCase())
    );
  }

  updateClick() {
    if (this.turnForm.valid) {
      const updatedTurn = {
        ...this.turn,
        ...this.turnForm.value
      };
      console.log("updateClick2",updatedTurn);
      this.turnSave.emit(updatedTurn);
      this.snackBar.open('Turn updated successfully!', 'Close', { duration: 2000 });
    }
  }

  edit() {
    console.log("update1",this.update);
    
    this.update = !this.update;
    // this.router.navigate(['/turn/update',this.turn.id])
    console.log("update2",this.update);

  }
  
}
