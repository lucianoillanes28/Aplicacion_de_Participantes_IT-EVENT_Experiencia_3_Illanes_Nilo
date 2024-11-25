import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { IEventos } from 'src/interfaces/IEventos';

@Component({
    selector: 'app-qr-page',
    templateUrl: './qr-page.page.html',
    styleUrls: ['./qr-page.page.scss'],
    standalone: false
})
export class QrPagePage implements OnInit {
  qrdata: string = '';
  eventoSeleccionado: IEventos | null = null;

  constructor(private router: Router) {}

  ngOnInit() {
    // Suscribirse a los eventos de navegación para detectar cambios dinámicamente
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const navigation = this.router.getCurrentNavigation();
        if (navigation?.extras.state) {
          const state: any = navigation.extras.state;
          this.qrdata = state.qrdata || 'No se pudo generar QR.';
          this.eventoSeleccionado = state.evento || null;
        }
      }
    });
  }

  volver() {
    this.router.navigate(['/tabs/tab4']);
  }
}
