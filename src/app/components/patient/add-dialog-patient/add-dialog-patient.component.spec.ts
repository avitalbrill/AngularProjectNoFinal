import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDialogPatientComponent } from './add-dialog-patient.component';

describe('AddDialogPatientComponent', () => {
  let component: AddDialogPatientComponent;
  let fixture: ComponentFixture<AddDialogPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddDialogPatientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddDialogPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
