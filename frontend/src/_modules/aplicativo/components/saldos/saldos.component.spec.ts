import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaldosComponent } from './saldos.component';

describe('SaldosComponent', () => {
  let component: SaldosComponent;
  let fixture: ComponentFixture<SaldosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaldosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaldosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
