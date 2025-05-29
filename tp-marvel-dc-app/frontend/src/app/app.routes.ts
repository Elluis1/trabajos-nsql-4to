import { Routes } from '@angular/router';
import { VistaPersonajesDcComponent } from './vista-personajes-dc/vista-personajes-dc.component';
import { VistaPersonajesMarvelComponent } from './vista-personajes-marvel/vista-personajes-marvel.component';
import { ListaPersonajesComponent } from './lista-personajes/lista-personajes.component';
import { VistaPersonajesComponent } from './vista-personajes/vista-personajes.component';

export const routes: Routes = [
    {path: '', redirectTo: '/lista-heroes', pathMatch: 'full' },
    {path: 'personaje/:id', component: VistaPersonajesComponent },
    {path: 'lista-heroes', component: ListaPersonajesComponent },
    {path: 'personajes-dc', component: VistaPersonajesDcComponent },
    {path: 'personajes-marvel', component: VistaPersonajesMarvelComponent },
];
