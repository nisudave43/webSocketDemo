import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StockComponent} from '../../app/components/stock/stock.component';
import { ProfileComponent} from '../../app/components/profile/profile.component'
import { HeaderComponent } from '../../app/components/header/header.component';

//Routing Module
const routes: Routes = [
  { path: 'stock', component: StockComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'header', component: HeaderComponent },

  { path: '', redirectTo: '/stock', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [],
   exports: [ RouterModule ]
})
export class RoutingModule { }
