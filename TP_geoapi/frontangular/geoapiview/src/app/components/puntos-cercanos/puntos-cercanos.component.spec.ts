import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuntosCercanosComponent } from './puntos-cercanos.component';

describe('PuntosCercanosComponent', () => {
  let component: PuntosCercanosComponent;
  let fixture: ComponentFixture<PuntosCercanosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PuntosCercanosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PuntosCercanosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
