import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Turn } from '../../models/turn';
import { TurnService } from '../../services/turn.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-turns-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './turns-list.component.html',
  styleUrls: ['./turns-list.component.css']
})
export class TurnsListComponent implements OnInit {
  public turnsList: Turn[] = [];

  constructor(private turnService: TurnService, private router: Router) {}

  ngOnInit(): void {
    this.loadTurns();
  }

  loadTurns(): void {
    this.turnService.getAllTurns().subscribe({
      next: (turns) => {
        this.turnsList = turns;
      },
      error: (err) => console.error('Error fetching turns', err)
    });
  }

  delete(turn: Turn): void {
    this.router.navigate(['/delete-turn', turn.id]);
  }

  update(turn: Turn): void {
    this.router.navigate(['/update-turn', turn.id]);
  }
}
