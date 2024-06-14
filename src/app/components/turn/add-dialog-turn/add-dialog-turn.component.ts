import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { AddTurnComponent } from '../add-turn/add-turn.component';

@Component({
  selector: 'app-add-dialog-turn',
  standalone: true,
  imports: [CommonModule,MatIcon],
  templateUrl: './add-dialog-turn.component.html',
  styleUrl: './add-dialog-turn.component.css'
})
export class AddDialogTurnComponent {

  date!: Date;
  hour!: number;
  treatmentDuration!:number;
  animal!:string
  constructor(public dialog: MatDialog,private route:Router) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(AddTurnComponent, {
      data: {animal:this.animal,date: this.date,hour: this.hour,treatmentDuration:this.treatmentDuration},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
}
