import { Component } from '@angular/core';
import { ListaPuntosComponent } from './components/lista-puntos/lista-puntos.component';
import { BusquedaPuntosComponent } from './components/puntos-cercanos/puntos-cercanos.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ListaPuntosComponent, BusquedaPuntosComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {}
