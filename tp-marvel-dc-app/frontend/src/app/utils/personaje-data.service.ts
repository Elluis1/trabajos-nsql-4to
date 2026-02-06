import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PersonajeDataService {
  private personajeSeleccionado: any = null;

  setPersonaje(personaje: any) {
    this.personajeSeleccionado = personaje;
    localStorage.setItem('personaje', JSON.stringify(personaje));
  }

  getPersonaje() {
    if (!this.personajeSeleccionado) {
      const saved = localStorage.getItem('personaje');
      if (saved) {
        this.personajeSeleccionado = JSON.parse(saved);
      }
    }
    return this.personajeSeleccionado;
  }
}
