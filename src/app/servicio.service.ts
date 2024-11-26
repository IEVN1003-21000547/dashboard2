import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { Usuario } from './usuario'; // Asegúrate de que esta ruta esté correcta

@Injectable({
  providedIn: 'root'
})
export class AdministracionService {
  private apiUrl = 'http://127.0.0.1:5000/usuarios';

  constructor(private http: HttpClient) {}

  // Obtener todos los usuarios
  public obtenerUsuarios(): Observable<Usuario[]> {
    return this.http.get<{ usuarios: Usuario[] }>(this.apiUrl).pipe(
      map(response => response.usuarios) // Extraer la lista de usuarios
    );
  }

  //login
  public login(credenciales: { correo: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credenciales);
  }  
  

  // Agregar un nuevo usuario
public agregarUsuario(usuario: Partial<Usuario>): Observable<any> {
  return this.http.post(this.apiUrl, usuario);
}


  // Eliminar un usuario por ID
  public eliminarUsuario(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}

