import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentCashPageRoutingModule } from './payment-cash-routing.module';

import { PaymentCashPage } from './payment-cash.page';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PaymentCashPageRoutingModule,
        FontAwesomeModule
    ],
  declarations: [PaymentCashPage]
})
export class PaymentCashPageModule {}
