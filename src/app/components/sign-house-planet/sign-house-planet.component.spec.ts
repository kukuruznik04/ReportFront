import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignHousePlanetComponent } from './sign-house-planet.component';

describe('SignHousePlanetComponent', () => {
  let component: SignHousePlanetComponent;
  let fixture: ComponentFixture<SignHousePlanetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignHousePlanetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignHousePlanetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
