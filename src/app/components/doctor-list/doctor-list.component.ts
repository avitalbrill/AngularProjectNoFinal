import { Component, OnInit, OnDestroy } from '@angular/core';
import { DoctorService } from '../../services/doctor.service';
import { Doctor } from '../../models/doctor';
import { Subscription } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';
import { AddDoctorComponent } from '../doctor/add-doctor/add-doctor.component';
import { UpdateDoctorComponent } from "../doctor/update-doctor/update-doctor.component";
import { CommonModule } from '@angular/common';
import { Turn } from '../../models/turn';
import { TurnService } from '../../services/turn.service';
import { AddDialogDoctorComponent } from '../doctor/add-dialog-doctor-component/add-dialog-doctor-component.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-doctor-list',
  standalone: true,
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.css'],
  imports: [AddDialogDoctorComponent, CommonModule, MatTableModule, MatIconModule, MatButtonModule, MatSortModule, AddDoctorComponent, UpdateDoctorComponent, FormsModule]
})
export class DoctorListComponent implements OnInit, OnDestroy {
  public doctorList: Doctor[] = [];
  public displayedColumns: string[] = ['id', 'firstName', 'lastName', 'domain', 'actions'];
  public add: boolean = false;
  turnList: Turn[] = [];
  private doctorUpdateSubscription!: Subscription;

  constructor(private doctorService: DoctorService, private turnService: TurnService) {}

  ngOnInit(): void {
    this.loadDoctors();
    this.doctorUpdateSubscription = this.doctorService.getDoctorUpdateListener().subscribe(() => {
      this.loadDoctors();
    });
  }

  ngOnDestroy(): void {
    if (this.doctorUpdateSubscription) {
      this.doctorUpdateSubscription.unsubscribe();
    }
  }

  loadDoctors(): void {
    this.doctorService.getAllDoctors().subscribe({
      next: (res) => {
        this.doctorList = res;
      },
      error: (err) => {
        console.error('Failed to fetch doctors:', err);
      }
    });
  }

  addDoctor(): void {
    this.add = true;
    console.log("Add doctor");
  }

  saveEditDoctor(doctor: Doctor): void {
    this.doctorService.updateDoctor(doctor.id!, doctor).subscribe({
      next: () => {
        console.log("Doctor updated successfully");
      },
      error: (err) => {
        console.error('Failed to update doctor:', err);
      }
    });
  }

  deleteDoctor(doctor: Doctor): void {
    const confirmation = confirm(`Are you sure you want to delete ${doctor.firstName} ${doctor.lastName}?`);
    if (confirmation) {
      this.turnService.getAllTurns().subscribe({
        next: (turns) => {
          const appointmentsToDelete = turns.filter(turn =>
            turn.doctorId === doctor.id
          );

          if (appointmentsToDelete.length > 0) {
            const deleteAppointmentsConfirmation = confirm(`There are ${appointmentsToDelete.length} appointments scheduled with Dr. ${doctor.firstName} ${doctor.lastName}. Do you want to delete them as well?`);
            if (!deleteAppointmentsConfirmation) {
              return;
            }
          }

          this.doctorService.deleteDoctor(doctor.id!).subscribe({
            next: () => {
              this.doctorList = this.doctorList.filter(d => d.id !== doctor.id);
              console.log('Doctor deleted successfully');

              if (appointmentsToDelete.length > 0) {
                this.deleteAppointments(appointmentsToDelete);
              }
            },
            error: (err) => {
              console.error('Failed to delete doctor:', err);
            }
          });
        },
        error: (err) => {
          console.error('Failed to fetch appointments:', err);
        }
      });
    }
  }

  deleteAppointments(turns: Turn[]): void {
    turns.forEach(turn => {
      this.turnService.deleteTurn(turn.id).subscribe({
        next: () => {
          console.log(`Appointment ${turn.id} deleted successfully`);
        },
        error: (err) => {
          console.error(`Failed to delete appointment ${turn.id}:`, err);
        }
      });
    });
  }
}
