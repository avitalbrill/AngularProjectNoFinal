import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTurnComponent } from './update-turn.component';

describe('UpdateTurnComponent', () => {
  let component: UpdateTurnComponent;
  let fixture: ComponentFixture<UpdateTurnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateTurnComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateTurnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
