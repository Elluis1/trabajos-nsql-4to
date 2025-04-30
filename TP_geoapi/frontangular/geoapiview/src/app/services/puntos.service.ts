import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PuntosService {
  readonly apiUrl = 'http://localhost:8000/api/obtener_ubicaciones/';

  puntos: any[];

  constructor(private http: HttpClient) {
    this.puntos = [];
  }

  buscarPuntosCercanos(lat: number, lng: number, radio: number): Observable<any> {
    const url = `http://localhost:8000/api/cercanos/?lat=${lat}&lng=${lng}&radio=${radio}`;
    return this.http.get<any>(url);
  }
  

  getPuntos(): Observable<any> {
    return this.http.get<any[]>(this.apiUrl);
  }

  loadPuntos(): Observable<any> {
    const url = `http://localhost:8000/api/guardar_puntos/`
    return this.http.get<any[]>(url)
  }
}
