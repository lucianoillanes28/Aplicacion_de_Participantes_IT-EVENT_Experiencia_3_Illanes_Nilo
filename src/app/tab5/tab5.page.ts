import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Users } from 'src/interfaces/users';
import { ApidatosService } from '../services/apidatos.service';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
    selector: 'app-tab5',
    templateUrl: './tab5.page.html',
    styleUrls: ['./tab5.page.scss'],
    standalone: false
})
export class Tab5Page implements OnInit {
  usuarioActual: Users | null = null;
  username: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private menucontroller: MenuController,
    private apidatos: ApidatosService
  ) {}

  ngOnInit() {
    // Suscribirse al Observable que devuelve el usuario actual
    this.authService.getUsuarioActual().subscribe(
      (usuario: Users) => {
        this.usuarioActual = usuario; // Guardar el usuario
        this.username = this.capitalizeFirstLetter(usuario.username); // Transformar el nombre
      },
      (error) => {
        console.error('Error obteniendo el usuario:', error);
      }
    );
  }

  // Método para capitalizar la primera letra
  capitalizeFirstLetter(name: string): string {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  cerrarSesion() {
    this.authService.logout();
    this.router.navigate(['/logo-inicio']);
  }
}
