import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth:AuthService, private router:Router){}

  canActivate():boolean{
    console.log('%cauth.guard.ts line:13 Guardia', 'color: #007acc;');
    if(this.auth.sesionActiva()){
      return true;
    }else{
      this.router.navigateByUrl('/login');
      return false;
    }
    
  }
  
}
