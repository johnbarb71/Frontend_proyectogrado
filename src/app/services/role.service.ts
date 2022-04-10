import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { RoleModel } from '../models/role.model';
//Observable
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
//Headers
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  //servidor BackEnd
  url = 'http://localhost:8000/api/v1';

  constructor(private http : HttpClient, private auth:AuthService ) { }

  getRoles(){
    const reqHeader =  this.auth.headerToken();
    return this.http.get(`${this.url}/role`,{headers: reqHeader })
  }

  getRol(id:string){
    const reqHeader =  this.auth.headerToken();
    return this.http.get(`${this.url}/role/${id}`,{headers: reqHeader })
  }

  updRole(rol:RoleModel){
    const authData = {
      nombre : rol.nombre,
      id: rol.id
    };
    const reqHeader =  this.auth.headerToken();
    return this.http.put(
      `${ this.url }/role/${rol.id}`,
      authData,{headers: reqHeader });
  }

  agregarRole(role:RoleModel){
    const authData = {
      nombre : role.nombre,
      id: role.id
    };
    const reqHeader =  this.auth.headerToken();
    return this.http.post(
      `${ this.url }/role`,
      authData,{headers: reqHeader });
  }

}

