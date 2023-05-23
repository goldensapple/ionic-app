import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RentalPageRoutingModule } from './rental-routing.module';

import { RentalPage } from './rental.page';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RentalPageRoutingModule,
    NgxPaginationModule,
  ],
  declarations: [RentalPage]
})
export class RentalPageModule {}
