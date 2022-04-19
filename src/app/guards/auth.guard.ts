import { Injectable } from '@angular/core';
import { CanActivate, Router,ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
//ROLES
import { UsuarioModel } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  roleus: UsuarioModel;

  constructor(private auth:AuthService, private router:Router){}

  //Funciona correctamente
  /* canActivate():boolean{
    if(this.auth.sesionActiva()){
      return true;
    }else{
      this.router.navigateByUrl('/login');
      return false;
    }
  } */
  
  //Roles
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean{
    let authorization = this.auth.sesionActiva();
    const privileges = route.data;
    this.roleus = this.auth.leerUsuaTok();
    if(authorization){
      return true;
    }else{
      this.router.navigateByUrl('/login');
      return false;
    }
  }

}
