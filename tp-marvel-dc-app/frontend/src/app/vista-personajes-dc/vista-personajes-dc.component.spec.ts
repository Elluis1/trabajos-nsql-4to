import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaPersonajesDcComponent } from './vista-personajes-dc.component';

describe('VistaPersonajesDcComponent', () => {
  let component: VistaPersonajesDcComponent;
  let fixture: ComponentFixture<VistaPersonajesDcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VistaPersonajesDcComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VistaPersonajesDcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
