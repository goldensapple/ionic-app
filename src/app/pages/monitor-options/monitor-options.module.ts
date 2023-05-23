import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MonitorOptionsPageRoutingModule } from './monitor-options-routing.module';

import { MonitorOptionsPage } from './monitor-options.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MonitorOptionsPageRoutingModule
  ],
  exports: [MonitorOptionsPage],
  declarations: [MonitorOptionsPage]
})
export class MonitorOptionsPageModule {}
