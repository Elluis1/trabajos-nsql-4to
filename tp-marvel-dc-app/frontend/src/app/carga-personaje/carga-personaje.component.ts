import { Component } from '@angular/core';
import { ConnectionDjangoService } from '../utils/connection-django.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-carga-personaje',
  imports: [FormsModule],
  templateUrl: './carga-personaje.component.html',
  styleUrl: './carga-personaje.component.css'
})

export class CargaPersonajeComponent {

  constructor(private ConnectionDjangoService: ConnectionDjangoService) {}

  personaje = {
    nombre: '',
    alias: '',
    universo: '',
    poderes: '',
    apariciones: '',
    edad: null,
    descripcion: '',
  };

  selectedFiles: File[] = [];

  onFilesSelected(event: any): void {
    this.selectedFiles = Array.from(event.target.files);
  }

  enviarDatos(): void {
    const formData = new FormData();
    formData.append('nombre', this.personaje.nombre);
    formData.append('alias', this.personaje.alias);
    formData.append('universo', this.personaje.universo);
    formData.append('poderes', this.personaje.poderes);
    formData.append('apariciones', this.personaje.apariciones);
    formData.append('edad', this.personaje.edad !== null ? this.personaje.edad : '');
    formData.append('descripcion', this.personaje.descripcion);
    this.selectedFiles.forEach((file, index) => {
      formData.append('imagenes', file); // el backend tiene que aceptar múltiples con este nombre
    });

    this.ConnectionDjangoService.cargarPersonaje(formData).subscribe({
      next: (response) => {
        console.log('Personaje cargado exitosamente:', response);
        alert('Personaje guardado con éxito');
        this.resetFormulario();
        this.selectedFiles = [];
      },
      error: (error) => {
        console.error('Error al cargar el personaje:', error);
        alert('Error al guardar el personaje');
      }
    });
  }

  resetFormulario(): void {
    this.personaje = {
      nombre: '',
      alias: '',
      universo: '',
      poderes: '',
      apariciones: '',
      edad: null,
      descripcion: ''
    };
  }
}