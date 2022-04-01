import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarusuariosComponent } from './editarusuarios.component';

describe('EditarusuariosComponent', () => {
  let component: EditarusuariosComponent;
  let fixture: ComponentFixture<EditarusuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarusuariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarusuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
