import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarsucursalComponent } from './agregarsucursal.component';

describe('AgregarsucursalComponent', () => {
  let component: AgregarsucursalComponent;
  let fixture: ComponentFixture<AgregarsucursalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarsucursalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarsucursalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
