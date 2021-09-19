import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZaposlenSignupComponent } from './zaposlen-signup.component';

describe('ZaposlenSignupComponent', () => {
  let component: ZaposlenSignupComponent;
  let fixture: ComponentFixture<ZaposlenSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZaposlenSignupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZaposlenSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
