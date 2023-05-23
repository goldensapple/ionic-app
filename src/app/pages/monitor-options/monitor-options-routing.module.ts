import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MonitorOptionsPage } from './monitor-options.page';

const routes: Routes = [
  {
    path: '',
    component: MonitorOptionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MonitorOptionsPageRoutingModule {}
