import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTurnComponent } from './delete-turn.component';

describe('DeleteTurnComponent', () => {
  let component: DeleteTurnComponent;
  let fixture: ComponentFixture<DeleteTurnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteTurnComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteTurnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
