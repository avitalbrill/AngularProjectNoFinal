// import { CommonModule } from '@angular/common';
// import { Component, EventEmitter, Input, OnInit, Output, input } from '@angular/core';
// import { FormControl, FormGroup, FormsModule, Validators,ReactiveFormsModule } from '@angular/forms';
// import { DoctorService } from '../../../services/doctor.service';
// import { Doctor } from '../../../models/doctor';
// import { ActivatedRoute } from '@angular/router';


// @Component({
//   selector: 'app-update-doctor',
//   standalone: true,
//   imports: [CommonModule, FormsModule,ReactiveFormsModule],
//   templateUrl: './update-doctor.component.html',
//   styleUrls: ['./update-doctor.component.css']  // שים לב שזה צריך להיות styleUrls ולא styleUrl
// })
// export class UpdateDoctorComponent implements OnInit{
//   private id!: number
//   public doctor: Doctor = {
//     id: this.id,
//     tz: 123456789,
//     firstName: 'uuuuu',
//     lastName: 'uuuuu',
//     domain: 'uuuuuuuuuu'
//   };
//   // public doctor!:Doctor
//   // public addForm!: FormGroup
//  constructor(private route: ActivatedRoute,private doctorService:DoctorService)
//   {}
//   ngOnInit(): void {
//     // this.addForm = new FormGroup({
//     //   "tz": new FormControl("tz", Validators.required),
//     //   "firstName": new FormControl("firstName", [Validators.required, Validators.maxLength(5)]),
//     //   "lastName": new FormControl("lastName", Validators.required),
//     //   "domain": new FormControl("domain", Validators.required),   
//     // }),
//     this.route.params.subscribe((param) => {
//       this.id = param['id']
//       //this.doctorService.updateDoctor(this.id).subscribe({
//         // next: (res) => {
//         //   this.doctor = res;
//         // }
//      // )
//     })
//   };
//   // @Output()
//   // public onUpdate: EventEmitter<any> = new EventEmitter<any>()

//   save() {
//     let d: Doctor = {
//       id:this.id,
//       // tz: parseInt(document.getElementById('tzId')?.innerText ||'' ) || this.doctor.tz,
//       tz:123456789,
//       firstName: document.getElementById('firstNameId')?.innerHTML || this.doctor.firstName,
//       lastName: document.getElementById('lastNameId')?.innerHTML || this.doctor.lastName,
//       domain: document.getElementById('domainId')?.innerHTML || '' || this.doctor.domain,
//     };
//     // this.onUpdate.emit();
//     this.doctorService.updateDoctor(this.id,d);
//   }
// }






import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DoctorService } from '../../../services/doctor.service';
import { Doctor } from '../../../models/doctor';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-doctor',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './update-doctor.component.html',
  styleUrls: ['./update-doctor.component.css']
})
export class UpdateDoctorComponent implements OnInit {
  // private id!: number;
  public doctorForm!: FormGroup;
  formVisible: boolean = true;
  @Input() id!: number

  constructor(private route: ActivatedRoute, private doctorService: DoctorService) {}

  ngOnInit(): void {
    // this.route.params.subscribe((param) => {
    //   this.id = param['id'];
    //   this.loadDoctorData(this.id);
    // });

    this.doctorForm = new FormGroup({
      tz: new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      domain: new FormControl('', [Validators.required, Validators.minLength(10)])
    });
  }

  // loadDoctorData(id: number): void {
  //   this.doctorService.getDoctorById(id).subscribe({
  //     next: (res) => {
  //       this.doctorForm.setValue({
  //         tz: res.tz,
  //         firstName: res.firstName,
  //         lastName: res.lastName,
  //         domain: res.domain
  //       });
  //     },
  //     error: (err) => console.error(err)
  //   });
  // }

  save(): void {
    if (this.doctorForm.valid) {
      const updatedDoctor: Doctor = {
        id: this.id,
        ...this.doctorForm.value
      };
      this.doctorService.updateDoctor(this.id, updatedDoctor).subscribe({
        next: () => console.log('Doctor updated successfully'),
        error: (err) => console.error(err)
      });
      this.reloadPage();

      // נסגור את הטופס אחרי השמירה
      this.closeForm();
    }
  }
  reloadPage() {
    // פעולה לטעינת הדף מחדש
    location.reload();
  }

  closeForm() {
    this.formVisible = false;
  }
}
