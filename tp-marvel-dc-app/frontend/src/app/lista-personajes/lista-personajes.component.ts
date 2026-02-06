import { Component } from '@angular/core';
import { ConnectionDjangoService } from '../utils/connection-django.service';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PersonajeDataService } from '../utils/personaje-data.service';
import { CargaPersonajeComponent } from '../carga-personaje/carga-personaje.component';

@Component({
  selector: 'app-lista-personajes',
  standalone: true,
  imports: [NgOptimizedImage, RouterLink, CargaPersonajeComponent, FormsModule],
  templateUrl: './lista-personajes.component.html',
  styleUrl: './lista-personajes.component.css'
})
export class ListaPersonajesComponent {
  constructor(private connectionService: ConnectionDjangoService, private personajeData: PersonajeDataService) { }
  personajeFilter: string = '';
  personajes: any[] = [];
  mensajeNoEncontrado: boolean = false;
  
  setPersonajeFilter() {
    const filtro = this.personajeFilter.trim();

    if (filtro === '') {
      this.obtenerDatos();
      return;
    }

    this.connectionService.filterPersonajes(filtro).subscribe(data => {
      this.personajes = data;
      this.mensajeNoEncontrado = this.personajes.length === 0;
    });
  }

  eliminarPersonaje(id: string) {
    this.connectionService.deletePersonaje(id).subscribe((res) => {
      console.log('Eliminado', res);
    });
  }

  guardarPersonaje(personaje: any) {
    this.personajeData.setPersonaje(personaje);
  }

  obtenerDatos() {
    this.connectionService.fetchData().subscribe(data => {
      this.personajes = data;
      this.mensajeNoEncontrado = this.personajes.length === 0;
    });
  }

  ngOnInit() {
    this.obtenerDatos();
  }
}
