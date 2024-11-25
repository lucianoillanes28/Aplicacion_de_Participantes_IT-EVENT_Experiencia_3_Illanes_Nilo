import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UserNuevo } from 'src/interfaces/users';

@Component({
    selector: 'app-crear-usuario',
    templateUrl: './crear-usuario.page.html',
    styleUrls: ['./crear-usuario.page.scss'],
    standalone: false
})
export class CrearUsuarioPage implements OnInit {

  registroForm: FormGroup; 
  userdata: any;  

  // Objeto que contiene los datos del nuevo usuario
  nuevoUsuario: UserNuevo = {
    username: "",
    email: "",
    rut: "",
    password: "",
    isactive: false
  };

  constructor(
    private authservice: AuthService,
    private fBuilder: FormBuilder,
    private router: Router,
    private alertController: AlertController
  ) {
    
    this.registroForm = this.fBuilder.group({
      username: new FormControl("", [Validators.required, Validators.minLength(6)]),
      email: new FormControl("", [Validators.required, Validators.email]),
      rut: new FormControl("", [Validators.required, Validators.minLength(9)]),  
      password: new FormControl("", [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)])  
    });
  }

  ngOnInit() { }

  
  crearUsuario() {
    if (this.registroForm.valid) {
      const rut = this.registroForm.value.rut;
  
      
      if (!this.validarRut(rut)) {
        this.mostrarErrorRut();
        return;  
      }

      // Verifica si el usuario ya existe
      this.authservice.GetUserByUsername(this.registroForm.value.username).subscribe(resp => {
        this.userdata = resp;
        if (this.userdata && this.userdata.length > 0) {
          this.registroForm.reset();
          this.errorDuplicidad();
        } else {          
          
          this.nuevoUsuario.username = this.registroForm.value.username;  
          this.nuevoUsuario.password = this.registroForm.value.password;  
          this.nuevoUsuario.email = this.registroForm.value.email;        
          this.nuevoUsuario.rut = this.formatearRut(this.registroForm.value.rut); 
          this.nuevoUsuario.isactive = true;                             
  
          
          this.authservice.PostUsuario(this.nuevoUsuario).subscribe(() => {
            this.registroForm.reset();
            this.mostrarMensaje();
  
            
            if (this.router.url !== '/comienzo') {
              this.router.navigateByUrl('/comienzo');
            }
          });
        }
      });
    }
  }

  
  async mostrarErrorRut() {
    const alerta = await this.alertController.create({
      header: 'Error',
      message: 'El RUT ingresado no es válido. Por favor, revisa los datos.',
      buttons: ['OK']
    });
    await alerta.present();
  }

  
  async mostrarMensaje() {
    const alerta = await this.alertController.create({
      header: 'Usuario Creado',
      message: 'Bienvenid@! ' + this.nuevoUsuario.username,
      buttons: ['OK']
    });
    await alerta.present();
  }

  // Función para mostrar un mensaje de error si el usuario ya existe
  async errorDuplicidad() {
    const alerta = await this.alertController.create({
      header: 'Error',
      message: 'El usuario ' + this.nuevoUsuario.username + ' ya está registrado.',
      buttons: ['OK']
    });
    await alerta.present();
  }

  // Función para validar el RUT usando el módulo 11 (sin puntos ni guion)
  validarRut(rut: string): boolean {
    if (!rut || rut.length < 9) {
      return false;
    }
  
    // Elimina puntos y guiones
    const rutLimpio = rut.replace(/\./g, '').replace(/-/g, '');
  
 
    const rutSinDv = rutLimpio.slice(0, -1);
    const dvIngresado = rutLimpio.slice(-1).toUpperCase();
  
   
    let suma = 0;
    let multiplicador = 2;
  
    for (let i = rutSinDv.length - 1; i >= 0; i--) {
      suma += parseInt(rutSinDv[i]) * multiplicador;
      multiplicador = multiplicador < 7 ? multiplicador + 1 : 2;
    }
  
    const dvEsperado = 11 - (suma % 11);
    const dvFinal = dvEsperado === 11 ? '0' : dvEsperado === 10 ? 'K' : dvEsperado.toString();
  
    return dvFinal === dvIngresado;
  }

  // Función para formatear el RUT con puntos y guion para almacenarlo
  formatearRut(rut: string): string {
    // Elimina puntos y guiones
    let rutLimpio = rut.replace(/\./g, '').replace(/-/g, '');

   
    let dv = rutLimpio.slice(-1);
    let cuerpo = rutLimpio.slice(0, -1);

    
    cuerpo = cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    return `${cuerpo}-${dv}`; 
  }
}
