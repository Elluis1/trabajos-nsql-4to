import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaPersonajesMarvelComponent } from './vista-personajes-marvel.component';

describe('VistaPersonajesMarvelComponent', () => {
  let component: VistaPersonajesMarvelComponent;
  let fixture: ComponentFixture<VistaPersonajesMarvelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VistaPersonajesMarvelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VistaPersonajesMarvelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
