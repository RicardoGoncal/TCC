import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './navegacao/home/home.component';
import { AcessoNegadoComponent } from './navegacao/acesso-negado/acesso-negado.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AcessoNegadoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
