import { Component } from '@angular/core';
import { ConnectionDjangoService } from '../utils/connection-django.service';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PersonajeDataService } from '../utils/personaje-data.service';
import { CargaPersonajeComponent } from '../carga-personaje/carga-personaje.component';

@Component({
  selector: 'app-lista-personajes',
  standalone: true,
  imports: [NgOptimizedImage, RouterLink, CargaPersonajeComponent],
  templateUrl: './lista-personajes.component.html',
  styleUrl: './lista-personajes.component.css'
})
export class ListaPersonajesComponent {
  constructor(private connectionService: ConnectionDjangoService, private personajeData: PersonajeDataService) { }

  personajes: any[] = [];

  eliminarPersonaje(id: string) {
    this.connectionService.deletePersonaje(id).subscribe((res) => {
      console.log('Eliminado', res);
    });
  }

  guardarPersonaje(personaje: any) {
    this.personajeData.setPersonaje(personaje);
  }

  obtenerDatos() {
    this.connectionService.fetchData().subscribe((data: any[]) => {
      this.personajes = data;
    });
  }

  ngOnInit() {
    this.obtenerDatos();
  }
}
