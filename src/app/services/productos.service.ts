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

  getProductoCodInv(codigo1:string,id_suc:string){
    const reqHeader =  this.auth.headerToken();
    return this.http.get(`${this.url}/productos/productocod/${codigo1}/${id_suc}`,{headers: reqHeader })
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

  updProductoCodigo(producto:ProductoModel,id_suc:string){
    const authData = {
      gondola: producto.gondola,
      bodega: producto.bodega
    };
    const reqHeader =  this.auth.headerToken();
    console.log('%cproductos.service.ts line:72 object', 'color: #007acc;',producto.codigo1,id_suc);
    return this.http.put(
      `${ this.url }/productos/producto/${producto.codigo1}/${id_suc}`,
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

  getInformesucursal(id_sucursal:string){
    const reqHeader =  this.auth.headerToken();
    return this.http.get(`${this.url}/informes/linea/${id_sucursal}`,{headers: reqHeader }).pipe(map(
      data =>{
        return data['producto'];
      }
    ))
  }

  getInformesucursallinea(id_sucursal:string,linea:string){
    const reqHeader =  this.auth.headerToken();
    return this.http.get(`${this.url}/informes/linea/${id_sucursal}/${linea}`,{headers: reqHeader }).pipe(map(
      data =>{
        return data['producto'];
      }
    ))
  }

  putCerosCantidades(id_sucursal:string){
    const reqHeader =  this.auth.headerToken();
    return this.http.get(`${this.url}/productos/xb36pvbtt64qhy29ggt3/${id_sucursal}`,{headers: reqHeader }).pipe(map(
      data =>{
        return data['producto'];
      }
    ))
  }

}
