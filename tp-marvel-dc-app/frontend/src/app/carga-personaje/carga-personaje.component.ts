import { Component } from '@angular/core';
import { ConnectionDjangoService } from '../utils/connection-django.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-carga-personaje',
  imports: [FormsModule],
  standalone: true,
  templateUrl: './carga-personaje.component.html',
  styleUrl: './carga-personaje.component.css'
})

export class CargaPersonajeComponent {
  poderes = ['Super fuerza', 'Vuelo', 'Invisibilidad', 'Telepatía', 'Regeneración', 'Control del tiempo'];
  apariciones = ['Comic', 'Película', 'Serie de TV', 'Videojuego', 'Merchandising'];

  personaje = {
    nombre: '',
    alias: '',
    universo: '',
    imagen: '',
    edad: null,
    descripcion: ''
  }

  constructor(private connectionService: ConnectionDjangoService) {}

  enviarDatos() {
    const data = {
      nombre: this.personaje.nombre,
      alias: this.personaje.alias,
      universo: this.personaje.universo,
      poderes: this.poderes,
      apariciones: this.apariciones,
      imagen: this.personaje.imagen,
      edad: this.personaje.edad,
      descripcion: this.personaje.descripcion
    };
    this.connectionService.cargarPersonaje(data).subscribe(response => {
      console.log('Respuesta del servidor:', response);
    }, error => {
      console.error('Error al enviar los datos:', error);
    });
  }
}
