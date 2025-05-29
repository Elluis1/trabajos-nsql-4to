import { Component } from '@angular/core';
import { PersonajeDataService } from '../utils/personaje-data.service';
import { FormsModule } from '@angular/forms';
import { ConnectionDjangoService } from '../utils/connection-django.service';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-vista-personajes',
  imports: [RouterLink, NgOptimizedImage, FormsModule],
  templateUrl: './vista-personajes.component.html',
  styleUrl: './vista-personajes.component.css'
})
export class VistaPersonajesComponent {
  constructor(private personajeData: PersonajeDataService, private connectionDjango: ConnectionDjangoService) {}

  numFoto: number = 0;

  actualizarPersonaje() {
    if (!this.personaje) {
      console.error('No se ha seleccionado ningún personaje.');
      return;
    }

    if (typeof this.personaje.poderes === 'string') {
      this.personaje.poderes = this.personaje.poderes
        .split(',')
        .map((p: string) => p.trim())
        .filter((p: string) => p.length > 0);
    }
  
    if (typeof this.personaje.apariciones === 'string') {
      this.personaje.apariciones = this.personaje.apariciones
        .split(',')
        .map((a: string) => a.trim())
        .filter((a: string) => a.length > 0);
    }

    this.connectionDjango.updatePersonaje(this.personaje.id, this.personaje).subscribe({
      next: (response) => {
        console.log('Enviando personaje actualizado:', this.personaje);
        console.log('Personaje actualizado exitosamente:', response);
        alert('Personaje actualizado con éxito');
        localStorage.setItem('personaje', JSON.stringify(this.personaje));
      },
      error: (error) => {
        console.log('Enviando personaje actualizado:', this.personaje);
        console.error('Error al actualizar el personaje:', error);
        alert('Error al actualizar el personaje');
      }
    });
  }

  posFoto() {
    this.numFoto++;
    if (this.numFoto > this.personaje.imagenes?.length - 1) {
      this.numFoto = 0;
    }
  }

  negFoto() {
    this.numFoto--;
    if (this.numFoto < 0) {
      this.numFoto = this.personaje.imagenes?.length - 1;
    }
  }

  personaje: any;

  ngOnInit() {
    this.personaje = this.personajeData.getPersonaje();
    console.log('Personaje seleccionado:', this.personaje);
    if (!this.personaje) {
      console.error('No se ha seleccionado ningún personaje.');
    }
  }

}
