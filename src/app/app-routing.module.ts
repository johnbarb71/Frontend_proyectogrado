import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
/* Modulos app */
import { LoginComponent } from './components/login/login.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { RegistroComponent } from './components/registro/registro.component';
import { HomeComponent } from "./components/home/home.component";
import { ContactoComponent } from "./components/share/contacto/contacto.component";
import { AyudaComponent } from "./components/share/ayuda/ayuda.component";
import { ShareInicioComponent } from "./components/share/inicio/inicio.component";
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path: 'inicio', component: InicioComponent},
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'home', component: HomeComponent, canActivate:[ AuthGuard],
    children: [
      { path: 'inicio', component: ShareInicioComponent, canActivate:[ AuthGuard] },
      { path: 'contacto', component: ContactoComponent, canActivate:[ AuthGuard] },
      { path: 'ayuda', component: AyudaComponent, canActivate:[ AuthGuard] },
    ] },
  
  { path: '', pathMatch: 'full', redirectTo: 'inicio' },
  { path: '**', pathMatch: 'full', redirectTo: 'inicio' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
