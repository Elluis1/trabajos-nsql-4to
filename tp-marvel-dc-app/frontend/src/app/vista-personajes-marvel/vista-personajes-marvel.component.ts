import { Component } from '@angular/core';
import { ConnectionDjangoService } from '../utils/connection-django.service';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PersonajeDataService } from '../utils/personaje-data.service';

@Component({
  selector: 'app-vista-personajes-marvel',
  imports: [NgOptimizedImage, RouterLink],
  templateUrl: './vista-personajes-marvel.component.html',
  styleUrl: './vista-personajes-marvel.component.css'
})
export class VistaPersonajesMarvelComponent {
  personajes: any[] = [];

  constructor(private connectionService: ConnectionDjangoService, private personajeData: PersonajeDataService) {}

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
