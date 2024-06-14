import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDialogTurnComponent } from './add-dialog-turn.component';

describe('AddDialogTurnComponent', () => {
  let component: AddDialogTurnComponent;
  let fixture: ComponentFixture<AddDialogTurnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddDialogTurnComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddDialogTurnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
