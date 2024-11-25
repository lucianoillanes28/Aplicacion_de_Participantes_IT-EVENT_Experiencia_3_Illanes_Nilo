import { Component, OnInit } from '@angular/core';
import { ApicrudService } from '../services/apicrud.service';
import { AuthService } from '../services/auth.service';
import { IEventos } from 'src/interfaces/IEventos';
import { Users } from 'src/interfaces/users';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalle-qr',
  templateUrl: './detalle-qr.page.html',
  styleUrls: ['./detalle-qr.page.scss'],
})
export class DetalleQrPage implements OnInit {

  eventosInscritos: IEventos[] = [];
  usuarioActual: Users | null = null;
  qrdata: string = '';
  eventoSeleccionado: IEventos | null = null;

  constructor(
    private apicrudService: ApicrudService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cargarEventosInscritos();
  }

  generarQr(evento: IEventos) {
    // Genera el QR basado en el evento seleccionado
    if (evento && evento.nombre && evento.descripcion) {
      this.qrdata = `Evento: ${evento.nombre}, Descripción: ${evento.descripcion}, Asistentes: ${evento.usuariosInscritos}`;
      this.eventoSeleccionado = evento;
      // Redirige a la página de QR con los datos
      this.router.navigate(['/qr-page'], {
        state: { qrdata: this.qrdata, evento: this.eventoSeleccionado }
      });
    } else {
      this.qrdata = 'Datos insuficientes'; // Valor por defecto si faltan datos
    }
  }

  cargarEventosInscritos() {
    this.authService.getUsuarioActual().subscribe((usuario: Users) => {
      if (usuario) {
        this.usuarioActual = usuario;
        this.apicrudService.getEvento().subscribe((eventos: IEventos[]) => {
          this.eventosInscritos = eventos.filter((evento) =>
            evento.usuariosInscritos.includes(usuario.id)
          );
        });
      } else {
        console.error('Usuario no autenticado.');
        this.router.navigate(['/login']); // Redirige al login si no hay usuario
      }
    });
  }

  volver() {
    this.router.navigate(['/tabs/tab4']);
  }
}
