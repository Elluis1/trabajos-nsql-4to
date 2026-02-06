import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuntosFavComponent } from './puntos-fav.component';

describe('PuntosFavComponent', () => {
  let component: PuntosFavComponent;
  let fixture: ComponentFixture<PuntosFavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PuntosFavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PuntosFavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
