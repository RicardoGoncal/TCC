import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login/login.component';
import { LogoutComponent } from './login/logout/logout.component';
import { HomeComponent } from './operacao/home/home.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

import { MatFormFieldModule } from '@angular/material/form-field';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { ListUavsComponent } from './operacao/list-uavs/list-uavs.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { AddUavComponent } from './operacao/add-uavs/add-uavs.component';
import { ClimaComponent } from './operacao/clima/clima.component';
import { AddUserComponent } from './operacao/add-user/add-user.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { GoogleMapsModule } from '@angular/google-maps'

import {MapsComponent} from './operacao/maps/maps-uavs.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoutComponent,
    HomeComponent,
    HeaderComponent,
    HomeComponent,
    ListUavsComponent,
    AddUavComponent,
    ClimaComponent,
    AddUserComponent,
    MapsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatToolbarModule,
    MatInputModule,
    MatPaginatorModule, 
    MatSelectModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    GoogleMapsModule,
    FlexLayoutModule
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
