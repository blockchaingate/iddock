import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
//import { RegisterComponent } from './components/register/register.component';
import { AddInfoComponent } from './components/add-info/add-info.component';
import { UpdateInfoComponent } from './components/update-info/update-info.component';
import { DetailComponent } from './components/detail/detail.component';
import { HistoryComponent } from './components/history/history.component';
import { OwnerComponent } from './components/owner/owner.component';
import { DetailBySequenceIDComponent } from './components/detail-by-sequence-id/detail-by-sequence-id.component';
const routes: Routes = [
  {
    path: 'register',
    loadChildren: () => import('./modules/register/register.module').then(m => m.RegisterModule)
  },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'add-info', component: AddInfoComponent },
  { path: 'detail/:type/:id', component: DetailComponent },
  { path: 'detail-by-sequence-id/:type/:id', component: DetailBySequenceIDComponent },
  { path: 'history/:type/:id', component: HistoryComponent },
  { path: 'update-info/:type/:id', component: UpdateInfoComponent },
  { path: 'owner/:type/:id', component: OwnerComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
