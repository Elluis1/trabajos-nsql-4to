import { Component, OnInit } from '@angular/core';
import { PuntosService } from '../../services/puntos.service';

@Component({
  selector: 'app-lista-puntos',
  standalone: true,
  imports: [],
  templateUrl: './lista-puntos.component.html',
  styleUrls: ['./lista-puntos.component.css']
})
export class ListaPuntosComponent implements OnInit {
  puntos: any[] = [];

  constructor(public puntosService: PuntosService) { }

  ngOnInit() {
    this.puntosService.loadPuntos().subscribe()
    
    this.puntosService.getPuntos().subscribe(
      {
        next: (data) => {
          this.puntos = data.puntos
        },
        error: (e) => {
          console.log(e)
        }
      });
  }
}