import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistoComponent } from './registo.component';

describe('RegistoComponent', () => {
  let component: RegistoComponent;
  let fixture: ComponentFixture<RegistoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
