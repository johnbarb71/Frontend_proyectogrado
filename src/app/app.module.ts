import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { RegistroComponent } from './components/registro/registro.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { HomeComponent } from './components/home/home.component';
import { NavComponent } from './components/share/nav/nav.component';
import { SidebarComponent } from './components/share/sidebar/sidebar.component';
import { ContactoComponent } from './components/share/contacto/contacto.component';
import { AyudaComponent } from './components/share/ayuda/ayuda.component';
import { ActivarusuarioComponent } from './components/usuarios/activarusuario/activarusuario.component';
import { EditarusuarioComponent } from './components/usuarios/editarusuario/editarusuario.component';
import { AgregarusuarioComponent } from './components/usuarios/agregarusuario/agregarusuario.component';
import { UsuarioComponent } from './components/usuarios/usuario/usuario.component';
import { EditarusuariosComponent } from './components/usuarios/editarusuarios/editarusuarios.component';
import { ActivarusuariosComponent } from './components/usuarios/activarusuarios/activarusuarios.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InicioComponent,
    RegistroComponent,
    HomeComponent,
    NavComponent,
    SidebarComponent,
    ContactoComponent,
    AyudaComponent,
    ActivarusuarioComponent,
    EditarusuarioComponent,
    AgregarusuarioComponent,
    UsuarioComponent,
    EditarusuariosComponent,
    ActivarusuariosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
