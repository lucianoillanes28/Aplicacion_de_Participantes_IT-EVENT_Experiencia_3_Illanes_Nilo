import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResumenEventosPage } from './resumen-eventos.page';

describe('ResumenEventosPage', () => {
  let component: ResumenEventosPage;
  let fixture: ComponentFixture<ResumenEventosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumenEventosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
