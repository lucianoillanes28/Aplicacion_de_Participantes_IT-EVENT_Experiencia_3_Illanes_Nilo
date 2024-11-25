import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface Menu {
  icon: string;
  name: string;
  redirecTo: string;
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  menu: Menu[] = [
    {
      icon: 'sparkles-outline',
      name: 'Inicio',
      redirecTo: '/tabs/tab1',
    },
    {
      icon: 'sunny-outline',
      name: 'Registro',
      redirecTo: '/tabs/tab2',
    },
    {
      icon: 'paw-outline',
      name: 'Eventos',
      redirecTo: '/tabs/tab3',
    },
    {
      icon: 'person-circle-outline',
      name: 'QR',
      redirecTo: '/tabs/tab4',
    },
    {
      icon: 'rocket-outline',
      name: 'Mi Perfil',
      redirecTo: '/tabs/tab5',
    },
    {
      icon: 'rocket-outline',
      name: 'Mis Eventos', // Nueva opción
      redirecTo: '/mis-eventos',
    },
    {
      icon: 'rocket-outline',
      name: 'Resumen de Eventos', // Nueva opción
      redirecTo: '/resumen-eventos',
    },
    
  ];

  constructor(private router: Router) {}

  // Función que determina si el menú debe ser mostrado
  shouldShowMenu() {
    const allowedRoutes = ['/tabs/tab1', '/tabs/tab2', '/tabs/tab3', '/tabs/tab4', '/tabs/tab5', '/mis-eventos', '/resumen-eventos',];
    return allowedRoutes.includes(window.location.pathname);
  }
}
