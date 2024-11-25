import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IEvento, IEventos } from 'src/interfaces/IEventos';
import { switchMap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class ApicrudService {

  constructor(private httpclient: HttpClient) { }


  getEvento(): Observable<IEventos[]> {
    return this.httpclient.get<IEventos[]>(`${environment.apiUrl}/eventos`);
  }
  

  postEvento(newEvento: IEvento): Observable<IEvento> {
    return this.httpclient.post<IEvento>(`${environment.apiUrl}/eventos`, newEvento);
  }

  putEvento(evento: any): Observable<IEventos> {
    return this.httpclient.put<IEventos>(`${environment.apiUrl}/eventos/${evento.id}`, evento);
  }

  deleteEvento(id: string): Observable<any> { 
    return this.httpclient.delete(`${environment.apiUrl}/eventos/${id}`);
  }

  getEventoById(id: string): Observable<IEventos> {
    return this.httpclient.get<IEventos>(`${environment.apiUrl}/eventos/${id}`);
  }
  

  inscribirUsuarioEnEvento(eventoId: string, usuarioId: string): Observable<IEventos> {
    return this.httpclient.get<IEventos>(`${environment.apiUrl}/eventos/${eventoId}`).pipe(
      switchMap((evento) => {
        // Verificar si el usuario ya está inscrito
        if (!evento.usuariosInscritos.includes(usuarioId)) {
          evento.usuariosInscritos.push(usuarioId); // Agregar usuario al array de inscritos
          evento.cantidadAsistentes = (parseInt(evento.cantidadAsistentes) + 1).toString(); // Incrementar contador
        }
        // Actualizar el evento en la base de datos
        return this.httpclient.put<IEventos>(`${environment.apiUrl}/eventos/${eventoId}`, evento);
      })
    );
  }

  desinscribirUsuarioDeEvento(eventoId: string, usuarioId: string): Observable<IEventos> {
    return this.httpclient.get<IEventos>(`${environment.apiUrl}/eventos/${eventoId}`).pipe(
      switchMap((evento) => {
        // Eliminar al usuario del array de inscritos
        evento.usuariosInscritos = evento.usuariosInscritos.filter(id => id !== usuarioId);
        evento.cantidadAsistentes = (parseInt(evento.cantidadAsistentes) - 1).toString(); // Reducir contador
  
        // Actualizar el evento en la base de datos
        return this.httpclient.put<IEventos>(`${environment.apiUrl}/eventos/${eventoId}`, evento);
      })
    );
  }

  deleteUsuarioInscrito(eventoId: string, usuarioId: string): Observable<IEventos> {
    return this.getEventoById(eventoId).pipe(
      switchMap((evento: IEventos) => {
        evento.usuariosInscritos = evento.usuariosInscritos.filter((id: string) => id !== usuarioId);
  
        return this.putEvento(evento); // Retorna el evento actualizado
      })
    );
  }
  
  
  
}