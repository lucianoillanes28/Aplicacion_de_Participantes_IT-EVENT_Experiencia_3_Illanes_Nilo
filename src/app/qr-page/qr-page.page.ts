import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { IEventos } from 'src/interfaces/IEventos';
import { AuthService } from 'src/app/services/auth.service';
import { forkJoin, of } from 'rxjs';

@Component({
  selector: 'app-qr-page',
  templateUrl: './qr-page.page.html',
  styleUrls: ['./qr-page.page.scss'],
  standalone: false,
})
export class QrPagePage implements OnInit {
  qrdata: string = '';
  eventoSeleccionado: IEventos | null = null;
  usuarioLogueado: string | null = null; // Nombre del usuario logueado

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    // Usar forkJoin para sincronizar la obtención del usuario logueado y los datos del evento
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const navigation = this.router.getCurrentNavigation();

        if (navigation?.extras.state) {
          const state: any = navigation.extras.state;
          this.eventoSeleccionado = state.evento || null;

          if (this.eventoSeleccionado) {
            console.log('Evento recibido:', this.eventoSeleccionado);

            // Sincronizar con el usuario logueado
            forkJoin({
              usuario: this.authService.getUsuarioActual(),
              evento: of(this.eventoSeleccionado),
            }).subscribe(
              ({ usuario, evento }) => {
                this.usuarioLogueado = usuario.username;

                console.log('Usuario logueado:', this.usuarioLogueado);

                // Filtrar el evento para el usuario logueado
                evento.usuariosInscritos = evento.usuariosInscritos.filter(
                  (usuario) => usuario === this.usuarioLogueado
                );

                console.log('Usuarios inscritos después del filtro:', evento.usuariosInscritos);

                // Generar QR solo si hay datos
                this.qrdata = JSON.stringify({
                  evento: evento.nombre,
                  descripcion: evento.descripcion,
                  fecha: evento.fecha,
                  hora: evento.hora,
                  usuario: this.usuarioLogueado,
                });

                console.log('Datos del QR:', this.qrdata);
              },
              (error) => {
                console.error('Error al sincronizar datos:', error);
                this.qrdata = 'No se pudo generar QR.';
              }
            );
          } else {
            console.error('No se recibió ningún evento');
            this.qrdata = 'No se pudo generar QR.';
          }
        } else {
          console.error('No se recibió ningún estado de navegación');
        }
      }
    });
  }

  volver() {
    this.router.navigate(['/tabs/tab4']);
  }
}
