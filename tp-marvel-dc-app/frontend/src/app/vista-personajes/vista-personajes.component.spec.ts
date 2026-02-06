import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaPersonajesComponent } from './vista-personajes.component';

describe('VistaPersonajesComponent', () => {
  let component: VistaPersonajesComponent;
  let fixture: ComponentFixture<VistaPersonajesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VistaPersonajesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VistaPersonajesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
