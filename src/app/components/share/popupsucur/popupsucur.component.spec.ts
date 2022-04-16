import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupsucurComponent } from './popupsucur.component';

describe('PopupsucurComponent', () => {
  let component: PopupsucurComponent;
  let fixture: ComponentFixture<PopupsucurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupsucurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupsucurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
