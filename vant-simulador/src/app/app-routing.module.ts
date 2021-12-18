import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListVantsComponent } from './list-vants/list-vants.component';
import { VantComponent } from './vant/vant.component';

const routes: Routes = [
  { path: '', component: ListVantsComponent },
  { path: 'vants', component: ListVantsComponent },
  { path: 'vants/:id', component: VantComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
