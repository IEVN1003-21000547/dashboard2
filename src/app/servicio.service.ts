import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Administrador, Escuela, Alumno, Padre } from './usuario';

@Injectable({
  providedIn: 'root'
})
export class AdministracionService {
  private baseUrl = 'http://127.0.0.1:5000';

  constructor(private http: HttpClient) {}

  // ----- Administradores -----
  public loginAdministrador(credenciales: { Correo: string; Contrasena: string }): Observable<{ mensaje: string; exito: boolean; administrador?: Administrador }> {
    return this.http.post<{ mensaje: string; exito: boolean; administrador?: Administrador }>(
      `${this.baseUrl}/administradores/login`,
      credenciales
    );
  }

  public obtenerAdministradores(): Observable<Administrador[]> {
    return this.http.get<{ administradores: Administrador[] }>(`${this.baseUrl}/administradores`).pipe(
      map(response => response.administradores)
    );
  }

  public agregarAdministrador(admin: Partial<Administrador>): Observable<any> {
    return this.http.post(`${this.baseUrl}/administradores`, admin);
  }

  public actualizarAdministrador(id: number, admin: Partial<Administrador>): Observable<any> {
    return this.http.put(`${this.baseUrl}/administradores/${id}`, admin);
  }

  public eliminarAdministrador(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/administradores/${id}`);
  }

  // ----- Escuelas -----
  public obtenerEscuelas(): Observable<Escuela[]> {
    return this.http.get<{ escuelas: Escuela[] }>(`${this.baseUrl}/escuelas`).pipe(
      map(response => response.escuelas)
    );
  }

  public agregarEscuela(escuela: Partial<Escuela>): Observable<any> {
    return this.http.post(`${this.baseUrl}/escuelas`, escuela);
  }

  public actualizarEscuela(id: number, escuela: Partial<Escuela>): Observable<any> {
    return this.http.put(`${this.baseUrl}/escuelas/${id}`, escuela);
  }

  public eliminarEscuela(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/escuelas/${id}`);
  }

  public verificarEscuela(datos: { Nombre: string; Correo: string; NumeroEscuela: string }): Observable<{ mensaje: string; exito: boolean; escuela?: Escuela }> {
    return this.http.post<{ mensaje: string; exito: boolean; escuela?: Escuela }>(
      `${this.baseUrl}/escuelas/verificar`,
      datos
    );
  }     

  // ----- Alumnos -----
  public obtenerAlumnos(): Observable<Alumno[]> {
    return this.http.get<{ alumnos: Alumno[] }>(`${this.baseUrl}/alumnos`).pipe(
      map(response => response.alumnos)
    );
  }

  public agregarAlumno(alumno: Partial<Alumno>): Observable<any> {
    return this.http.post(`${this.baseUrl}/alumnos`, alumno);
  }

  public actualizarAlumno(matricula: string, alumno: Partial<Alumno>): Observable<any> {
    return this.http.put(`${this.baseUrl}/alumnos/${matricula}`, alumno);
  }

  public eliminarAlumno(matricula: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/alumnos/${matricula}`);
  }

  // ----- Padres -----
  public loginPadre(credenciales: { Correo: string; Contrasena: string }): Observable<{ mensaje: string; exito: boolean; padre?: Padre }> {
    return this.http.post<{ mensaje: string; exito: boolean; padre?: Padre }>(
      `${this.baseUrl}/padres/login`,
      credenciales
    );
  }

  public obtenerPadres(): Observable<Padre[]> {
    return this.http.get<{ padres: Padre[] }>(`${this.baseUrl}/padres`).pipe(
      map(response => response.padres)
    );
  }

  public agregarPadre(padre: Partial<Padre>): Observable<any> {
    return this.http.post(`${this.baseUrl}/padres`, padre);
  }

  public actualizarPadre(id: number, padre: Partial<Padre>): Observable<any> {
    return this.http.put(`${this.baseUrl}/padres/${id}`, padre);
  }

  public eliminarPadre(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/padres/${id}`);
  }

  
}
