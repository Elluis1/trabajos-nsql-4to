import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PuntosService } from '../../services/puntos.service';

@Component({
  selector: 'app-busqueda-puntos',
  imports: [FormsModule],
  templateUrl: './puntos-cercanos.component.html'
})
export class BusquedaPuntosComponent {
  lat = 0;
  lng = 0;
  radio = 5;
  puntosCercanos: any[] = [];

  constructor(public puntosService: PuntosService) {}

  buscarCercanos() {
    this.puntosService.buscarPuntosCercanos(this.lat, this.lng, this.radio).subscribe({
      next: (res) => this.puntosCercanos = res.puntos,
      error: (err) => console.error(err)
    });
  }
}
