import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddDialogDoctorComponent} from './add-dialog-doctor-component.component';

describe('AddDialogDoctorComponent', () => {
  let component: AddDialogDoctorComponent;
  let fixture: ComponentFixture<AddDialogDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddDialogDoctorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddDialogDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
