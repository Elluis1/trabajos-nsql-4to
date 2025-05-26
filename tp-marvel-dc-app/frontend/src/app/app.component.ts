import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CargaPersonajeComponent } from './carga-personaje/carga-personaje.component';
import { ListaPersonajesComponent } from './lista-personajes/lista-personajes.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CargaPersonajeComponent, ListaPersonajesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'spa-marvel-dc';
}
