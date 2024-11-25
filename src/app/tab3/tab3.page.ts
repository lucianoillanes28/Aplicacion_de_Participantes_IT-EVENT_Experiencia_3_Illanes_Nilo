import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ApicrudService } from '../services/apicrud.service';
import { IEventos } from 'src/interfaces/IEventos';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular';
import { Users } from 'src/interfaces/users';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  eventos: IEventos[] = [];

  constructor(
    private menucontroller: MenuController,
    private apicrud: ApicrudService,
    private router: Router,
    private authService: AuthService,
    private alertController: AlertController
  ) {}

  mostrarMenu() {
    this.menucontroller.open('first');
  }

  ngOnInit() {
    this.cargarEventos(); // Usar cargarEventos al inicializar
  }

  cargarEventos() {
    this.apicrud.getEvento().subscribe((data: IEventos[]) => {
      this.eventos = data;
    });
  }

  crearEvento() {
    this.router.navigate(['/agregar']);
  }

  listarEvento() {
    this.router.navigate(['/detalle-evento']); // Redirige a la página detalle-evento
  }

  actualizarEvento() {
    this.router.navigate(['/actualizar']);
  }

  inscribirse(evento: IEventos) {
    this.authService.GetUserByUsername('usuario_actual').subscribe((usuario) => {
      if (!usuario) {
        console.error('Usuario no encontrado');
        return;
      }

      if (!evento.usuariosInscritos.includes(usuario.id)) {
        // Inscribir al usuario
        evento.usuariosInscritos.push(usuario.id);
        evento.cantidadAsistentes = (parseInt(evento.cantidadAsistentes) + 1).toString();

        // Guardar los cambios en el backend
        this.apicrud.putEvento(evento).subscribe(() => {
          this.alertController
            .create({
              header: 'Éxito',
              message: `Te has inscrito al evento "${evento.nombre}".`,
              buttons: ['OK'],
            })
            .then((alert) => alert.present());
          this.cargarEventos(); // Actualizar listas
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
    });
  }
}

