import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivarusuariosComponent } from './activarusuarios.component';

describe('ActivarusuariosComponent', () => {
  let component: ActivarusuariosComponent;
  let fixture: ComponentFixture<ActivarusuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivarusuariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivarusuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
