import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResumenEventosPage } from './resumen-eventos.page';

const routes: Routes = [
  {
    path: '',
    component: ResumenEventosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResumenEventosPageRoutingModule {}
