import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LancamentoDetalheComponent } from './lancamento-detalhe.component';

describe('LancamentoDetalheComponent', () => {
  let component: LancamentoDetalheComponent;
  let fixture: ComponentFixture<LancamentoDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LancamentoDetalheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LancamentoDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
