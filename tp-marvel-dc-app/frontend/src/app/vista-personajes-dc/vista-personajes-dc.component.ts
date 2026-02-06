import { Component, OnInit } from '@angular/core';
import { ConnectionDjangoService } from '../utils/connection-django.service';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PersonajeDataService } from '../utils/personaje-data.service';

@Component({
  selector: 'app-vista-personajes-dc',
  standalone: true,
  imports: [NgOptimizedImage, RouterLink],
  templateUrl: './vista-personajes-dc.component.html',
  styleUrl: './vista-personajes-dc.component.css'
})
export class VistaPersonajesDcComponent implements OnInit {

  personajesDC: any[] = [];

  constructor(
    private connectionService: ConnectionDjangoService,
    private personajeData: PersonajeDataService
  ) {}

  ngOnInit() {
    this.connectionService.fetchData().subscribe((data: any[]) => {
      this.personajesDC = data.filter(p => p.universo === 'DC');
    });
  }

  guardarPersonaje(personaje: any) {
    this.personajeData.setPersonaje(personaje);
  }
}
