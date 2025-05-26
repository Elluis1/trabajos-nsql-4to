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
    url: ''
  };

  selectedFile: File | null = null;

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  enviarDatos(): void {
    const formData = new FormData();
    formData.append('nombre', this.personaje.nombre);
    formData.append('alias', this.personaje.alias);
    formData.append('universo', this.personaje.universo);
    formData.append('poderes', this.personaje.poderes);         // coma-separado
    formData.append('apariciones', this.personaje.apariciones); // coma-separado
    formData.append('edad', this.personaje.edad !== null ? this.personaje.edad : '');
    formData.append('descripcion', this.personaje.descripcion);
    formData.append('imagen', this.selectedFile || new Blob());

    this.ConnectionDjangoService.cargarPersonaje(formData).subscribe({
      next: (response) => {
        console.log('Personaje cargado exitosamente:', response);
      },
      error: (error) => {
        console.error('Error al cargar el personaje:', error);
      }
    });
  }
}