import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConnectionDjangoService {
  URL = "http://localhost:8000/api/personajes/";
  public http = inject(HttpClient);

  cargarPersonaje(data: any): Observable<any> {
    return this.http.post(this.URL, data)
  }

  fetchData(): Observable<any[]> {
    return this.http.get<any>(this.URL)
  }
}
