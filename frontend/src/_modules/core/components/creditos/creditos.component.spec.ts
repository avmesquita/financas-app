import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditosComponent } from './creditos.component';

describe('CreditosComponent', () => {
  let component: CreditosComponent;
  let fixture: ComponentFixture<CreditosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
