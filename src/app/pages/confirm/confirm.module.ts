import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfirmPageRoutingModule } from './confirm-routing.module';

import { ConfirmPage } from './confirm.page';
import { MonitorOptionsPageModule } from '../monitor-options/monitor-options.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfirmPageRoutingModule,
    MonitorOptionsPageModule
  ],
  declarations: [ConfirmPage]
})
export class ConfirmPageModule {}
