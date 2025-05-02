import { Component } from '@angular/core';
import { PuntosService } from '../../services/puntos.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './puntos-fav.component.html',
})

export class PuntosFavComponent {
  lat!: number;
  lng!: number;
  radio!: number;
  puntosCercanos: any[] = [];

  constructor(private puntosService: PuntosService) {}

  buscarCercanos() {
    this.puntosService.buscarPuntosCercanosConDistancia(this.lat, this.lng, this.radio).subscribe(
      response => {
        this.puntosCercanos = response.puntos;
      },
      error => {
        console.error('Error al buscar puntos cercanos:', error);
      }
    );
  }
}
