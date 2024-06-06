import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TurnService } from '../../../services/turn.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-turn',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-turn.component.html',
  styleUrls: ['./add-turn.component.css']
})
export class AddTurnComponent implements OnInit {
  public addTurn!: FormGroup;

  constructor(private turnService: TurnService, private route: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.addTurn = new FormGroup({
      'date': new FormControl('', Validators.required),
      'hour': new FormControl('', Validators.required),
      'treatmentDuration': new FormControl('', Validators.required),
      'patientId': new FormControl('', Validators.required),
      'doctorId': new FormControl('', Validators.required)
    });
  }

  public save(): void {
    if (this.addTurn.valid) {
      const turnValue = this.addTurn.value;
      const date = new Date(turnValue.date);
      date.setHours(turnValue.hour);

      const turnData = {
        ...turnValue,
        date: date.toISOString()
      };

      this.turnService.addTurn(turnData).subscribe(() => {
        this.openSnackBar('Turn added successfully', 'Close');
      });
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
