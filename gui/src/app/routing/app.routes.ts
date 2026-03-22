import { Routes } from '@angular/router';

import { DashboardPageComponent } from '../pages/dashboard/dashboard.page';
import { NotFoundPageComponent } from '../pages/not-found/not-found.page';
import { PublicCheckinPageComponent } from '../pages/public-checkin/public-checkin.page';
import { QrManagementPageComponent } from '../pages/qr-management/qr-management.page';
import { ThankYouPageComponent } from '../pages/thank-you/thank-you.page';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'checkin/:pointCode', component: PublicCheckinPageComponent },
  { path: 'thank-you', component: ThankYouPageComponent },
  { path: 'dashboard', component: DashboardPageComponent },
  { path: 'qr-management', component: QrManagementPageComponent },
  { path: '**', component: NotFoundPageComponent },
];
