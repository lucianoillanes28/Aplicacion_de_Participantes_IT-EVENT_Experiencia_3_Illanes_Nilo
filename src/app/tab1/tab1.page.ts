import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ApidatosService } from '../services/apidatos.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss'],
    standalone: false
})
export class Tab1Page implements OnInit {
  posteos: any[] = [];
  username: string = '';

  constructor(
    private menucontroller: MenuController,
    private apidatos: ApidatosService,
    private router: Router
  ) {}

  ngOnInit() {
    // Obtener el nombre de usuario desde localStorage al cargar la página
    this.username = localStorage.getItem('username') || '';
  }

  mostrarMenu() {
    this.menucontroller.open('first');
  }

  CargarApi() {
    this.apidatos.getPosts().subscribe((resp) => {
      console.log(resp);
    });

    this.apidatos.getPosts().subscribe((datos) => (this.posteos = datos));
  }

  buscarPost(Observable: any) {
    this.router.navigate(['/detalle'], {
      queryParams: { post: JSON.stringify(Observable) },
    });
  }
}
