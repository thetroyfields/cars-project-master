import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { CarDetailComponent } from './shopping/car-detail/car-detail.component';
import { CarListComponent } from './shopping/car-list/car-list.component';
import { SellComponent } from './shopping/sell/sell.component';
import { ShoppingComponent } from './shopping/shopping.component';

const routes: Routes = [
  { path: 'shopping', component: ShoppingComponent, children: [
    { path: '', component: CarListComponent }
  ]},
  { path: ':id', component: CarDetailComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/shopping', pathMatch: 'full'},
  { path: 'sell', component: SellComponent, canActivate: [AuthGuard]},
  { path: 'auth', component: AuthComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
