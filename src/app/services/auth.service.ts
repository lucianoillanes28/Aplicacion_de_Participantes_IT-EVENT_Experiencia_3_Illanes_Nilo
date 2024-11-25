import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'; 
import { Observable, throwError } from 'rxjs'; 
import { catchError, map } from 'rxjs/operators'; 
import { Users, UserNuevo } from 'src/interfaces/users';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private usuarioActual: Users | null = null; 
  private apiUrl = environment.apiUrl; 

  constructor(private httpclient: HttpClient) {}

  // Método de login para autenticar un usuario
  login(data: any): Observable<any> {
    return this.httpclient
      .get<Users[]>(
        `${this.apiUrl}/usuarios/?username=${data.username}&password=${data.password}`
      )
      .pipe(
        map((users) => {
          if (users.length === 0) {
            throw new Error('Usuario no encontrado');
          }
          const usuario = users[0];
          sessionStorage.setItem('usuario_actual', JSON.stringify(usuario)); 
          return usuario;
        }),
        catchError((error: HttpErrorResponse) => {
          console.error('Error en la autenticación', error);
          return throwError(error);
        })
      );
  }

  // Obtener todos los usuarios
  GetAllUsers(): Observable<Users[]> {
    return this.httpclient.get<Users[]>(`${this.apiUrl}/usuarios`);
  }

  // Crear un nuevo usuario
  PostUsuario(newUsuario: UserNuevo): Observable<UserNuevo> {
    return this.httpclient.post<UserNuevo>(
      `${this.apiUrl}/usuarios`,
      newUsuario
    );
  }

  // Buscar un usuario por su username
  GetUserByUsername(username: string): Observable<Users | undefined> {
    const url = `${this.apiUrl}/usuarios?username=${username}`;
    console.log('URL de consulta:', url); 
    return this.httpclient.get<Users[]>(url).pipe(
      map((users) => {
        console.log('Usuarios encontrados:', users); 
        return users.length > 0 ? users[0] : undefined; 
      })
    );
  }

  // Establecer el usuario autenticado
  setUsuarioActual(usuario: Users): void {
    this.usuarioActual = usuario;
  }

  getUsuarioActual(): Observable<Users> {
    const username = localStorage.getItem('username');
    return this.httpclient
      .get<Users[]>(`${this.apiUrl}/usuarios?username=${username}`)
      .pipe(
        map((users) => {
          if (users.length === 0) {
            throw new Error('Usuario no encontrado');
          }
          return users[0];
        })
      );
  }

  // Verificar si un usuario está autenticado
  IsLoggedIn(): boolean {
    return this.usuarioActual !== null;
  }

  logout() {
    sessionStorage.removeItem('usuario_actual');
  }

  updateUsuario(usuario: Users): Observable<Users> {
    return this.httpclient.put<Users>(
      `${this.apiUrl}/usuarios/${usuario.id}`,
      usuario
    );
  }
}
