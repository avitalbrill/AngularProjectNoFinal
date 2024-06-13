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
import { AddDoctorComponent } from '../add-doctor/add-doctor.component';

export interface DialogData {
  firstName: string;
  lastName: string;
  domain:string;
  animal:string;
}

/**
 * @title Dialog Overview
 */
@Component({
  selector: 'app-add-dialog-doctor-component',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule,MatIconButton,MatIconModule,AddDoctorComponent],
  templateUrl: './add-dialog-doctor-component.component.html',
  styleUrl: './add-dialog-doctor-component.component.css'
})
export class AddDialogDoctorComponent {

  firstName!: string;
  lastName!: string;
  domain!:string;
  animal!:string
  constructor(public dialog: MatDialog,private route:Router) {}

  openDialog(): void {
    // this.route.navigate(['add-doctor'])
    const dialogRef = this.dialog.open(AddDoctorComponent, {
      data: {animal:this.animal,firstName: this.firstName, lastName: this.lastName,domain:this.domain},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
}