import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './navegacao/home/home.component';
import { AcessoNegadoComponent } from './navegacao/acesso-negado/acesso-negado.component';
import { VantComponent } from './navegacao/vant/vant.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AcessoNegadoComponent,
    VantComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
