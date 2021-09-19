import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LozinkaComponent } from './lozinka.component';

describe('LozinkaComponent', () => {
  let component: LozinkaComponent;
  let fixture: ComponentFixture<LozinkaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LozinkaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LozinkaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
