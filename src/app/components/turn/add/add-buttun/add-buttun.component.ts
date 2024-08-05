import {Component, Inject} from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import {MatButtonModule, MatIconButton} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { AddFormComponent } from '../add-form/add-form.component';

export interface DialogData {
  date: Date;
  hour: number;
  treatmentDuration:number;
  patientId:number;
  doctorId:number;
}

/**
 * @title Dialog Overview
 */
@Component({
  selector: 'app-add-buttun',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule,MatIconButton,MatIconModule],
  templateUrl: './add-buttun.component.html',
  styleUrl: './add-buttun.component.css'
})
export class AddButtunComponent {

  date!: Date;
  hour!: number;
  treatmentDuration!:number;
  doctorId!:number;
  patientId!:number
  

  animal!:string
  constructor(public dialog: MatDialog,private route:Router) {}

  openDialog(): void {
    console.log("openDialog");
    
    this.route.navigate(['/turn/add'])
    const dialogRef = this.dialog.open(AddFormComponent, {
      data: {animal:this.animal,date: this.date, hour: this.hour,treatmentDuration:this.treatmentDuration,patientId:this.patientId,doctorId:this.doctorId},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
}
