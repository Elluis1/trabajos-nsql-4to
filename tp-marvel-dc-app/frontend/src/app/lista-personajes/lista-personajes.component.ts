import { Component } from '@angular/core';
import { ConnectionDjangoService } from '../utils/connection-django.service';

@Component({
  selector: 'app-lista-personajes',
  standalone: true,
  imports: [],
  templateUrl: './lista-personajes.component.html',
  styleUrl: './lista-personajes.component.css'
})
export class ListaPersonajesComponent {
  constructor(private connectionService: ConnectionDjangoService) {}

  personajes: any[] = [];

  obtenerDatos() {
    this.connectionService.fetchData().subscribe((data: any[]) => {
      this.personajes = data;
    });
  }
  
  ngOnInit() {
    this.obtenerDatos();
  }
}
