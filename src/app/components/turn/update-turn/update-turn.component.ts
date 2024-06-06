import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TurnService } from '../../../services/turn.service';
import { Turn } from '../../../models/turn';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-turn',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './update-turn.component.html',
  styleUrls: ['./update-turn.component.css']
})
export class UpdateTurnComponent implements OnInit {
  private id!: number;
  public turnForm!: FormGroup;

  constructor(private route: ActivatedRoute, private turnService: TurnService) {}

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      this.id = param['id'];
      this.loadTurnData(this.id);
    });

    this.turnForm = new FormGroup({
      date: new FormControl('', Validators.required),
      hour: new FormControl('', Validators.required),
      treatmentDuration: new FormControl('', Validators.required),
      doctorId: new FormControl('', Validators.required),
      patientId: new FormControl('', Validators.required)
    });
  }

  loadTurnData(id: number): void {
    this.turnService.getTurnById(id).subscribe({
      next: (res) => {
        this.turnForm.setValue({
          date: res.date,
          hour: res.hour,
          treatmentDuration: res.treatmentDuration,
          doctorId: res.doctorId,
          patientId: res.patientId
        });
      },
      error: (err) => console.error(err)
    });
  }

  save(): void {
    if (this.turnForm.valid) {
      const updatedTurn: Turn = {
        id: this.id,
        ...this.turnForm.value
      };
      this.turnService.updateTurn(this.id, updatedTurn).subscribe({
        next: () => console.log('Turn updated successfully'),
        error: (err) => console.error(err)
      });
    }
  }
}
