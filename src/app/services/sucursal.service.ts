import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { SucursalModel } from '../models/sucursal.model';
//Observable
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
//Headers
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class SucursalService {

  //servidor BackEnd
  url = 'http://localhost:8000/api/v1';
  //Observable sucursal para NAVBAR
  numSucursal: SucursalModel;
  numSucToken: string;
  private numSucursal$ = new Subject<SucursalModel>();

  constructor(private http : HttpClient, private auth:AuthService) { }

  getSucursales(){
    const reqHeader =  this.auth.headerToken();
    return this.http.get(`${this.url}/sucursal`,{headers: reqHeader })
  }

  getSucursal(id:string){
    const reqHeader =  this.auth.headerToken();
    return this.http.get(`${this.url}/sucursal/${id}`,{headers: reqHeader })
  }

  updSucursal(sucursal:SucursalModel){
    const authData = {
      nombre : sucursal.nombre,
      id: sucursal.id,
      direccion: sucursal.direccion,
      telefono: sucursal.telefono
    };
    const reqHeader =  this.auth.headerToken();
    return this.http.put(
      `${ this.url }/sucursal/${sucursal.id}`,
      authData,{headers: reqHeader });
  }

  agregarSucursal(sucursal:SucursalModel){
    const authData = {
      nombre : sucursal.nombre,
      id: sucursal.id,
      direccion: sucursal.direccion,
      telefono: sucursal.telefono

    };
    const reqHeader =  this.auth.headerToken();
    return this.http.post(
      `${ this.url }/sucursal`,
      authData,{headers: reqHeader });
  }

  //Método para leer sucursal del LocalStorage para el NAVBAR
  public leerSucuAct(){
    this.numSucToken = JSON.parse(localStorage.getItem('sucAct'));
    this.getSucursal(this.numSucToken).subscribe((resp:any)=>{
      this.numSucursal = resp;
      this.numSucursal$.next(this.numSucursal);
    })
  }
  getSucursalNum$(): Observable<SucursalModel>{
    return this.numSucursal$.asObservable();
  }
}
