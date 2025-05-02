import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PuntosService {
  readonly apiUrl = 'http://localhost:8000/api/';

  loadPuntos(): Observable<any> {
    const url = `guardar_puntos/`
    return this.http.get<any[]>(this.apiUrl + url)
  }

  puntos: any[];

  constructor(private http: HttpClient) {
    this.puntos = [];
  }
  
  buscarPuntosCercanos(lat: number, lng: number, radio: number): Observable<any> {
    const url = `distancias/?lat=${lat}&lng=${lng}&radio=${radio}`;
    return this.http.get<any>(this.apiUrl + url);
  }

  buscarPuntosCercanosConDistancia(lat: number, lng: number, radio: number): Observable<any> {
    const url = `distancias/?lat=${lat}&lng=${lng}&radio=${radio}`;
    return this.http.get<any>(this.apiUrl + url);
  }

  getPuntos(): Observable<any> {
    const url = `obtener_ubicaciones/`
    return this.http.get<any[]>(this.apiUrl + url);
  }

  getPuntosConDistancia(lat: number, lng: number): Observable<any[]> {
    const url = `obtener_ubicaciones/?lat=${lat}&lng=${lng}`;
    return this.http.get<any[]>(this.apiUrl + url);
  }  

}
