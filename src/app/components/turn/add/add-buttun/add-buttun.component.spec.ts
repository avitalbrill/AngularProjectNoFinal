import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddButtunComponent } from './add-buttun.component';

describe('AddButtunComponent', () => {
  let component: AddButtunComponent;
  let fixture: ComponentFixture<AddButtunComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddButtunComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddButtunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
