import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { UsuarioModel } from '../models/usuario.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //servidor BackEnd
  url = 'http://localhost:8000/api/v1';

  userToken: any = null;
  userData: any = null;

  constructor( private http : HttpClient ) {
    this.leerTokenLocSt();
   }

    logout(){
      this.http.post(`${ this.url }/logout`,localStorage.getItem('token'));
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('expira');
      return;
    }

    login(usuario:UsuarioModel){
      const loginData = {
        email : usuario.email,
        password : usuario.password
      }
      return this.http.post(`${ this.url }/login`,
      loginData).pipe(
        map((resp:any) => {
          this.guardarToken(resp['token'],resp['user']);
        })
        )
    }

    registrarUsuario(usuario:UsuarioModel){
      const authData = {
        name : usuario.nombre,
        email : usuario.email,
        password : usuario.password
      };

      return this.http.post(
        `${ this.url }/register`,
        authData);
    }

    private guardarToken(idToken: string, user:string){
      this.userToken = idToken;
      localStorage.setItem('token',idToken);
      localStorage.setItem('user',JSON.stringify(user));
      //algoritmo de exp de Token
      let fecha = new Date();
      fecha.setSeconds( 3600 );
      localStorage.setItem('expira',fecha.getTime().toString());
    }

    leerTokenLocSt(){
      if(localStorage.getItem('token')){
        console.log('%cauth.service.ts line:49 object', 'color: #007acc;', localStorage.getItem('token')); 
        this.userToken = localStorage.getItem('token');
      }else{
        this.userToken = '';
      }
      return this.userToken;
    }

    leerUserLocSt(){
      if(localStorage.getItem('user')){
        console.log('%cauth.service.ts line:65 object', 'color: #007acc;', localStorage.getItem('user')); 
        this.userData = localStorage.getItem('user');
      }else{
        this.userData = '';
      }
      return this.userData;
    }


    sesionActiva():boolean{
      if(this.userToken.length < 2){
        return false;
      }
      const expira = Number( localStorage.getItem('expira'));
      const expiraDate = new Date();
      expiraDate.setTime(expira);
      if(expiraDate > new Date()){
        return true;
      } else {
        return false;
      }
    }

  
}
