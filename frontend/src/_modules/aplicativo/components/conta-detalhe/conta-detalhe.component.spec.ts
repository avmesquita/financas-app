import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContaDetalheComponent } from './conta-detalhe.component';

describe('ContaDetalheComponent', () => {
  let component: ContaDetalheComponent;
  let fixture: ComponentFixture<ContaDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContaDetalheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContaDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
