import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login/login.component';
import { LogoutComponent } from './login/logout/logout.component';
import { AddUavComponent } from './operacao/add-uav/add-uav.component';
import { ClimaComponent } from './operacao/clima/clima.component';
import { HomeComponent } from './operacao/home/home.component';
import { ListUavsComponent } from './operacao/list-uavs/list-uavs.component';
import { AuthguardService } from './service/authguard.service';

const routes: Routes = [
  { path: '', component: ListUavsComponent,canActivate:[AuthguardService] },
  { path: 'uavs', component: ListUavsComponent,canActivate:[AuthguardService] },
  { path: 'uavs/new', component: AddUavComponent,canActivate:[AuthguardService] },
  { path: 'uavs/:id', component: HomeComponent,canActivate:[AuthguardService] },
  { path: 'clima', component: ClimaComponent,canActivate:[AuthguardService] },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent,canActivate:[AuthguardService] },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
