import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResumenEventosPageRoutingModule } from './resumen-eventos-routing.module';

import { ResumenEventosPage } from './resumen-eventos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResumenEventosPageRoutingModule
  ],
  declarations: [ResumenEventosPage]
})
export class ResumenEventosPageModule {}
