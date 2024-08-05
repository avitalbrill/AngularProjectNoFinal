import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import {MatTabsModule} from '@angular/material/tabs';



@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule,MatToolbar,RouterLink],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
}
