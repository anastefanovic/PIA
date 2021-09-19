import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredmetiListaComponent } from './predmeti-lista.component';

describe('PredmetiListaComponent', () => {
  let component: PredmetiListaComponent;
  let fixture: ComponentFixture<PredmetiListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PredmetiListaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PredmetiListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
