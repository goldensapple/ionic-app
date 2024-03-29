import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentCreditPageRoutingModule } from './payment-credit-routing.module';

import { PaymentCreditPage } from './payment-credit.page';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PaymentCreditPageRoutingModule,
        FontAwesomeModule
    ],
  declarations: [PaymentCreditPage]
})
export class PaymentCreditPageModule {}
