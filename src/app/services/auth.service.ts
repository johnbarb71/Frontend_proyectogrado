import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UsuarioModel } from '../models/usuario.model';
//Observable
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
//finde Observable
import { map } from 'rxjs/operators';
import { SucursalModel } from '../models/sucursal.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //servidor BackEnd
  url = 'http://localhost:8000/api/v1';

  userToken: any = null;
  userData: any = null;
  usuario1: UsuarioModel;
  guest: UsuarioModel;
  numSucursal: string;
  private numSucursal$ = new Subject<string>();

  constructor( private http : HttpClient ) {
    this.leerTokenLocSt();
   }

    logout(){
      this.http.post(`${ this.url }/logout`,localStorage.getItem('token'));
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('expira');
      localStorage.removeItem('suc');
      localStorage.removeItem('sucAct');
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
          this.guardarToken(resp['token'],resp['user'], resp['id_sucursal']/* [0]['id_sucursal'] */);
          this.leerUsuario();
        })
        )
    }

    registrarUsuario(usuario:UsuarioModel){
      const authData = {
        name : usuario.name,
        email : usuario.email,
        password : usuario.password
      };

      return this.http.post(
        `${ this.url }/register`,
        authData);
    }

    crearUsuario(usuario:UsuarioModel){
      const authData = {
        name : usuario.name,
        email : usuario.email,
        password : usuario.password,
        estado : usuario.estado,
        role: usuario.role
      };
      var reqHeader = new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
     });
      return this.http.post(
        `${ this.url }/new-user`,
        authData,{headers: reqHeader });
    }

    updUsuario(usuario:UsuarioModel){
      const authData = {
        name : usuario.name,
        email : usuario.email,
        password : usuario.password,
        estado : usuario.estado,
        role: usuario.role
      };
      var reqHeader = new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      });
      return this.http.put(
        `${ this.url }/user/updestuser/${usuario.id}`,
        authData,{headers: reqHeader });
    }

    updPassUsuario(usuario:UsuarioModel){
      const authData = {
        password : usuario.password
      };
      var reqHeader = new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      });
      return this.http.put(
        `${ this.url }/user/updpassuser/${usuario.id}`,
        authData,{headers: reqHeader });
    }

    getUsuarios(){
      const reqHeader = this.headerToken();
      return this.http.get(`${this.url}/user/getusuarios`,{headers: reqHeader })
    }

    getUsuario(id:string){
      const reqHeader = this.headerToken();
      return this.http.get(`${this.url}/user/getusuario/${id}`,{headers: reqHeader })
    }

    private guardarToken(idToken: string, user:string, sucursal:string){
      this.userToken = idToken;
      localStorage.setItem('token',idToken);
      localStorage.setItem('user',JSON.stringify(user));
      localStorage.setItem('suc',JSON.stringify(sucursal));
      //algoritmo de exp de Token
      let fecha = new Date();
      fecha.setSeconds( 3600 );
      localStorage.setItem('expira',fecha.getTime().toString());
    }

    leerTokenLocSt(){
      if(localStorage.getItem('token')){
        /* console.log('%cauth.service.ts line:49 object', 'color: #007acc;', localStorage.getItem('token'));  */
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
    //Obtener el token y enviarlo por petición http
    headerToken(){
      var reqHeader = new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      });
      return reqHeader;
    }
    
    public leerUsuario(){
      return this.usuario1 = JSON.parse((localStorage.getItem('user')));
    }

    public leerSucu(){
      return JSON.parse((localStorage.getItem('suc')));
    }
    
 
    guardarTokenSuc(sucursal:string){
      localStorage.setItem('suc',JSON.stringify(sucursal));
    }

    guardarSucAct(sucursal:string){
      localStorage.setItem('sucAct',JSON.stringify(sucursal));
    }
  
    //Método para leer sucursal del LocalStorage para el NAVBAR
    public leerSucuAct(){
      return this.numSucursal = JSON.parse(localStorage.getItem('sucAct'));
    }
    getSucursalNum$(): Observable<string>{
      return this.numSucursal$.asObservable();
    }
}
