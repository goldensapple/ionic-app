import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'settings',
    pathMatch: 'full'
  },
  {
    path: 'payment-menu',
    loadChildren: () => import('./payment-menu/payment-menu.module').then( m => m.PaymentMenuPageModule)
  },
  {
    path: 'welcome',
    loadChildren: () => import('./pages/welcome/welcome.module').then( m => m.WelcomePageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'report-modal',
    loadChildren: () => import('./pages/report-modal/report-modal.module').then( m => m.ReportModalPageModule)
  },
  {
    path: 'alert-message',
    loadChildren: () => import('./pages/alert-message/alert-message.module').then( m => m.AlertMessagePageModule)
  },
  {
    path: 'plan',
    loadChildren: () => import('./pages/plan/plan.module').then( m => m.PlanPageModule)
  },
  {
    path: 'member',
    loadChildren: () => import('./pages/member/member.module').then( m => m.MemberPageModule)
  },
  {
    path: 'room',
    loadChildren: () => import('./pages/room/room.module').then( m => m.RoomPageModule)
  },
  {
    path: 'rental',
    loadChildren: () => import('./pages/rental/rental.module').then( m => m.RentalPageModule)
  },
  {
    path: 'confirm',
    loadChildren: () => import('./pages/confirm/confirm.module').then( m => m.ConfirmPageModule)
  },
  {
    path: 'monitor-options',
    loadChildren: () => import('./pages/monitor-options/monitor-options.module').then( m => m.MonitorOptionsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
