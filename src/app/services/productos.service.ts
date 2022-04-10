import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ProductoModel } from '../models/producto.model';
//Observable
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
//Headers
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  //servidor BackEnd
  url = 'http://localhost:8000/api/v1';

  constructor(private http : HttpClient, private auth:AuthService ) { }


  getProductos(){
    const reqHeader =  this.auth.headerToken();
    return this.http.get(`${this.url}/productos`,{headers: reqHeader })
  }

  getProducto(id:string){
    const reqHeader =  this.auth.headerToken();
    return this.http.get(`${this.url}/productos/${id}`,{headers: reqHeader })
  }

  getProductoCodigo(codigo1:string){
    const reqHeader =  this.auth.headerToken();
    return this.http.get(`${this.url}/productos/producto/${codigo1}`,{headers: reqHeader })
  }

  getproductonombre(nombre:string){
    const reqHeader =  this.auth.headerToken();
    return this.http.get(`${this.url}/productos/producto/buscar/${nombre}`,{headers: reqHeader })
  }

  getproductxlinea(linea:string){
    const reqHeader =  this.auth.headerToken();
    return this.http.get(`${this.url}/productos/linea/${linea}`,{headers: reqHeader })
  }

  updProducto(producto:ProductoModel){
    const authData = {
      nombre : producto.nombre,
      id: producto.id,
      codigo1: producto.codigo1,
      linea: producto.linea,
      estado: producto.estado
    };
    const reqHeader =  this.auth.headerToken();
    return this.http.put(
      `${ this.url }/productos/${producto.id}`,
      authData,{headers: reqHeader });
  }

  updProductoCodigo(producto:ProductoModel){
    const authData = {
      id: producto.id,
      gondola: producto.gondola,
      bodega: producto.bodega
    };
    const reqHeader =  this.auth.headerToken();
    return this.http.put(
      `${ this.url }/productos/producto${producto.id}`,
      authData,{headers: reqHeader });
  }

  agregarProducto(producto:ProductoModel){
    const authData = {
      nombre : producto.nombre,
      id: producto.id,
      linea: producto.linea,
      codigo1: producto.codigo1,
      cantidad: producto.cantidad,
      estado: producto.estado,
      gondola: producto.gondola,
      bodega: producto.bodega,
      resultado: producto.resultado
    };
    const reqHeader =  this.auth.headerToken();
    return this.http.post(
      `${ this.url }/productos`,
      authData,{headers: reqHeader });
  }
}
