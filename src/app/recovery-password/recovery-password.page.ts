import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http'; // Importa HttpClient

@Component({
  selector: 'app-recovery-password',
  templateUrl: './recovery-password.page.html',
  styleUrls: ['./recovery-password.page.scss'],
})
export class RecoveryPasswordPage {
  email: string = '';
  apiUrl: string = 'https://apitestdata-usuarios-1.onrender.com'; // URL de tu API

  constructor(
    private router: Router,
    private location: Location,
    private alertCtrl: AlertController,
    private http: HttpClient // Inyecta HttpClient
  ) {}

  // Función para enviar la contraseña
  async sendRecovery() {
    if (!this.email) {
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'Por favor, ingresa tu correo electrónico.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    try {
      // Llama a la API y busca el usuario por correo electrónico
      this.http.get<any>(`${this.apiUrl}/usuarios`).subscribe(async (response) => {
        const usuarios = response; // Obtén la lista de usuarios
        const usuario = usuarios.find((u: any) => u.email === this.email);

        if (usuario) {
          console.log(`Contraseña encontrada para ${usuario.email}: ${usuario.password}`);
          const successAlert = await this.alertCtrl.create({
            header: 'Éxito',
            message: `La contraseña se ha enviado a <b>${this.email}</b>.<br>
                      (Simulación: Tu contraseña es <b>${usuario.password}</b>)`,
            buttons: ['OK']
          });
          await successAlert.present();
          this.router.navigate(['/login']); // Redirige al login
        } else {
          const errorAlert = await this.alertCtrl.create({
            header: 'Error',
            message: 'Correo no encontrado. Verifica e intenta nuevamente.',
            buttons: ['OK']
          });
          await errorAlert.present();
        }
      });
    } catch (error) {
      console.error('Error al conectar con la API:', error);
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'No se pudo conectar con el servidor. Intenta más tarde.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  // Función para regresar a la página anterior
  goBack() {
    this.location.back();
  }
}
