import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentIcPageRoutingModule } from './payment-ic-routing.module';

import { PaymentIcPage } from './payment-ic.page';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PaymentIcPageRoutingModule,
        FontAwesomeModule
    ],
  declarations: [PaymentIcPage]
})
export class PaymentIcPageModule {}
