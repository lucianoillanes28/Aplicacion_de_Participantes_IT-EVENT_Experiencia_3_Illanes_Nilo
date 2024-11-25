import { Component, OnInit } from '@angular/core';
import { ApicrudService } from '../services/apicrud.service';
import { AuthService } from '../services/auth.service';
import { IEventos } from 'src/interfaces/IEventos';
import { Users } from 'src/interfaces/users';
import { AlertController } from '@ionic/angular';

@Component({
    selector: 'app-mis-eventos',
    templateUrl: './mis-eventos.page.html',
    styleUrls: ['./mis-eventos.page.scss'],
    standalone: false
})
export class MisEventosPage implements OnInit {
  misEventos: IEventos[] = [];
  eventosDisponibles: IEventos[] = [];
  usuarioActual: Users | null = null;

  constructor(
    private apicrud: ApicrudService,
    private authService: AuthService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.cargarUsuarioActual();
  }

  cargarUsuarioActual() {
    this.authService.getUsuarioActual().subscribe((usuario) => {
      if (usuario) {
        this.usuarioActual = usuario;
        this.cargarEventos();
      } else {
        console.error('Usuario no autenticado');
      }
    });
  }

  cargarEventos() {
    if (!this.usuarioActual) {
      console.error('Usuario actual no definido');
      return;
    }
    this.apicrud.getEvento().subscribe((eventos: IEventos[]) => {
      this.misEventos = eventos.filter((evento) =>
        evento.usuariosInscritos.includes(this.usuarioActual!.id)
      );
      this.eventosDisponibles = eventos.filter(
        (evento) => !evento.usuariosInscritos.includes(this.usuarioActual!.id)
      );
    });
  }

  inscribirse(evento: IEventos) {
    if (!this.usuarioActual) {
      console.error('Usuario actual no definido');
      return;
    }
    if (!evento.usuariosInscritos.includes(this.usuarioActual.id)) {
      evento.usuariosInscritos.push(this.usuarioActual.id);
      evento.cantidadAsistentes = (
        parseInt(evento.cantidadAsistentes) + 1
      ).toString();

      this.apicrud.putEvento(evento).subscribe(() => {
        this.alertController
          .create({
            header: 'Éxito',
            message: `Te has inscrito al evento "${evento.nombre}".`,
            buttons: ['OK'],
          })
          .then((alert) => alert.present());
        this.cargarEventos();
      });
    } else {
      this.alertController
        .create({
          header: 'Error',
          message: 'Ya estás inscrito en este evento.',
          buttons: ['OK'],
        })
        .then((alert) => alert.present());
    }
  }

  desinscribirse(evento: IEventos) {
    if (!this.usuarioActual) {
      console.error('Usuario actual no definido');
      return;
    }
    const index = evento.usuariosInscritos.indexOf(this.usuarioActual.id);
    if (index > -1) {
      evento.usuariosInscritos.splice(index, 1);
      evento.cantidadAsistentes = (
        parseInt(evento.cantidadAsistentes) - 1
      ).toString();

      this.apicrud.putEvento(evento).subscribe(() => {
        this.alertController
          .create({
            header: 'Desinscripción Exitosa',
            message: `Te has desinscrito del evento "${evento.nombre}".`,
            buttons: ['OK'],
          })
          .then((alert) => alert.present());
        this.cargarEventos();
      });
    } else {
      this.alertController
        .create({
          header: 'Error',
          message: 'No estás inscrito en este evento.',
          buttons: ['OK'],
        })
        .then((alert) => alert.present());
    }
  }
}
