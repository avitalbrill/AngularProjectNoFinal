import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Turn } from '../../models/turn';
import { TurnService } from '../../services/turn.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-turns-list',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './turns-list.component.html',
  styleUrl: './turns-list.component.css'
})
export class TurnsListComponent implements OnInit{
  public turnsList!:Turn[];

  constructor(private _turnService:TurnService){}
  ngOnInit(): void {
    this._turnService.getAllTurns().subscribe({
      next:(res)=>{
        this.turnsList=res;
      }
    })
  }

}
