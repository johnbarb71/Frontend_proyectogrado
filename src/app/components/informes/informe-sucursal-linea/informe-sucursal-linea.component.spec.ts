import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformeSucursalLineaComponent } from './informe-sucursal-linea.component';

describe('InformeSucursalLineaComponent', () => {
  let component: InformeSucursalLineaComponent;
  let fixture: ComponentFixture<InformeSucursalLineaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformeSucursalLineaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformeSucursalLineaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
