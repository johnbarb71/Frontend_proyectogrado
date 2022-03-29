import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivarusuarioComponent } from './activarusuario.component';

describe('ActivarusuarioComponent', () => {
  let component: ActivarusuarioComponent;
  let fixture: ComponentFixture<ActivarusuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivarusuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivarusuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
