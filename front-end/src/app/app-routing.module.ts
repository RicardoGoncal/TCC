import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login/login.component';
import { LogoutComponent } from './login/logout/logout.component';
import { HomeComponent } from './operacao/home/home.component';
import { ListVantsComponent } from './operacao/list-vants/list-vants.component';
import { AuthguardService } from './service/authguard.service';

const routes: Routes = [
  { path: 'vants', component: ListVantsComponent,canActivate:[AuthguardService] },
  { path: 'vants/:id', component: HomeComponent,canActivate:[AuthguardService] },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent,canActivate:[AuthguardService] },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
