import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../../services/patient.service';
import { ActivatedRoute ,Router} from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-delete-patient',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-patient.component.html',
  styleUrls: ['./delete-patient.component.css']
})
export class DeletePatientComponent implements OnInit {
  private id!: number;

  constructor(private route: ActivatedRoute, private patientService: PatientService,private router:Router) {}

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      this.id = param['id'];
      this.patientService.deletePatient(this.id).subscribe({
        next: () => {
          console.log('Patient deleted successfully');
          this.router.navigate(['/patients']); // נווט לדף הטבלה
        },
        error: (err) => console.error('Error deleting patient', err)
      });
    });
  }
}

