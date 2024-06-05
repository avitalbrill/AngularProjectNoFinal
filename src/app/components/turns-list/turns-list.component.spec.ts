import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnsListComponent } from './turns-list.component';

describe('TurnsListComponent', () => {
  let component: TurnsListComponent;
  let fixture: ComponentFixture<TurnsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TurnsListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TurnsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
