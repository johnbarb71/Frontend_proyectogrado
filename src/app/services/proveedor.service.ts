import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ProveedorModel } from '../models/proveedor.model';
//Observable
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
//Headers
import { AuthService } from "../services/auth.service";
import{ GlobalConstants } from '../common/global-constants';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  //servidor BackEnd
  //url = 'http://localhost:8000/api/v1';
  url = GlobalConstants.apiURL;

  constructor(private http : HttpClient, private auth:AuthService ) { }

  getProveedores(){
    const reqHeader =  this.auth.headerToken();
    return this.http.get(`${this.url}/proveedor`,{headers: reqHeader })
  }

  getProveedor(id:string){
    const reqHeader =  this.auth.headerToken();
    return this.http.get(`${this.url}/proveedor/${id}`,{headers: reqHeader })
  }

  updProveedor(proveedor:ProveedorModel){
    const authData = {
      nombre : proveedor.nombre,
      id: proveedor.id
    };
    const reqHeader =  this.auth.headerToken();
    return this.http.put(
      `${ this.url }/proveedor/${proveedor.id}`,
      authData,{headers: reqHeader });
  }

  agregarProveedor(proveedor:ProveedorModel){
    const authData = {
      nombre : proveedor.nombre,
      id: proveedor.id
    };
    const reqHeader =  this.auth.headerToken();
    return this.http.post(
      `${ this.url }/proveedor`,
      authData,{headers: reqHeader });
  }
}
