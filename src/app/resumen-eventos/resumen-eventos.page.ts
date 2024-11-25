import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApicrudService } from '../services/apicrud.service';
import { IEventos } from 'src/interfaces/IEventos';
import { interval, Subscription } from 'rxjs';

@Component({
    selector: 'app-resumen-eventos',
    templateUrl: './resumen-eventos.page.html',
    styleUrls: ['./resumen-eventos.page.scss'],
    standalone: false
})
export class ResumenEventosPage implements OnInit, OnDestroy {
  eventosResumen: IEventos[] = [];
  private eventosSubscription: Subscription | null = null;

  constructor(private apicrud: ApicrudService) {}

  ngOnInit() {
    // Actualizar cada 5 segundos automáticamente
    this.eventosSubscription = interval(5000).subscribe(() => {
      this.actualizarEventos();
    });

    // Cargar eventos inicialmente
    this.actualizarEventos();
  }

  actualizarEventos() {
    this.apicrud.getEvento().subscribe((eventos: IEventos[]) => {
      console.log('Eventos cargados desde el servicio:', eventos); // Depuración
      this.eventosResumen = eventos.map(evento => ({
        ...evento,
        cantidadInscritos: evento.usuariosInscritos.length,
      }));
      console.log('Eventos con cantidadInscritos:', this.eventosResumen); // Depuración
    });
  }

  ngOnDestroy() {
    // Cancelar suscripción cuando se destruya el componente
    if (this.eventosSubscription) {
      this.eventosSubscription.unsubscribe();
    }
  }
}
