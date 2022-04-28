import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { ProductoModel } from 'src/app/models/producto.model';
import { ProductosService } from 'src/app/services/productos.service';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioModel } from '../../../models/usuario.model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregarinventario',
  templateUrl: './agregarinventario.component.html',
  styleUrls: ['./agregarinventario.component.css']
})
export class AgregarinventarioComponent implements OnInit {

  producto = new ProductoModel();
  productos:ProductoModel []=[];
  public cantidadgondola: number;
  public cantidadbodega: number;
  cliente : UsuarioModel;
  suc:string;
  existe:number;

  constructor(private auth:AuthService,private location:Location, private router:Router, private produc:ProductosService) {
    this.suc = auth.leerSucuAct(); //OJO
    console.log('%cagregarinventario.component.ts line:27 this.suc', 'color: #007acc;', this.suc);
   }

  ngOnInit(): void {
    /* this.getProducto('1'); */
  }

  guardar(form:NgForm){
    const cod1 = this.producto.codigo1;
    const suc1 = this.producto.id_sucursal.toString();
    if (form.invalid) {
      Swal.fire({
        allowOutsideClick: false,
        title: '¡Error de digitación!',
        text: 'No se permite números negativos',
      })
      return;
    }
    if(!this.cantidadgondola){
      this.cantidadgondola = 0;
      this.producto.gondola = Number(this.producto.gondola) + this.cantidadgondola;
      //console.log('%cagregarinventario.component.ts line:31 this.producto.gondola', 'color: #007acc;', this.producto.gondola);
    }else{
      this.producto.gondola = Number(this.producto.gondola) + this.cantidadgondola;
    }
    if(!this.cantidadbodega){
      this.cantidadbodega = 0;
      this.producto.bodega = Number(this.producto.bodega) + this.cantidadbodega;
      //console.log('%cagregarinventario.component.ts line:37 this.producto.bodega', 'color: #007acc;', this.producto.bodega);
    }else{
      this.producto.bodega = Number(this.producto.bodega) + this.cantidadbodega;
    }
    this.produc.updProductoCodigo(this.producto,suc1).subscribe(resp=>{
      if(resp['message'] === 'Producto actualizado correctamente'){
        Swal.fire({
          allowOutsideClick: false,
          title: '¡Producto actualizado!',
          text: 'Proveedor actualizado con éxito.',
        })
      }
      if(resp['message'] === 'Producto creado correctamente'){
        Swal.fire({
          allowOutsideClick: false,
          title: '¡Producto creado!',
          text: 'Proveedor creado con éxito.',
        })
      }
      form.reset();
      
    },(err) => {
      Swal.fire({
        icon: 'error',
        allowOutsideClick: false,
        title: 'Error al modificar producto.',
        text: err.error.error,
      })
      return;
    });
    return;
  }

  getProducto(codigo1:string,sucur:string){
    this.produc.getProductoCodInv(codigo1,sucur).subscribe((resp:any) => {
      this.producto.codigo1 = resp['producto'][0]['codigo1'];
      this.producto.nombre = resp['producto'][0]['nombre'];
      this.producto.linea = resp['producto'][0]['linea'];
      this.producto.id_sucursal = Number(this.suc);
      if(resp['inventario']=='null'){
        this.producto.gondola = 0;
      }else{
        this.producto.gondola = resp['inventario'][0]['gondola'];
      }
      if(resp['inventario']=='null'){
        this.producto.bodega = 0;
      }else{
        this.producto.bodega = resp['inventario'][0]['bodega'];
      }
    },(err) => {
      if(err.status === 404){
        Swal.fire({
          icon: 'error',
          allowOutsideClick: false,
          title: 'Error al buscar el producto.',
          text: 'Este producto no se encuentra registrado.',
        })
      }
    })
  }

  /* getProductoEstado(codigo1:string,sucur:string){
    this.produc.getProductoCodInv(codigo1,sucur).subscribe((resp:any) => {
      if(resp['inventario']=='null'){
        return 0;
        console.log('%cagregarinventario.component.ts line:91 this.existe', 'color: #007acc;', this.existe);
      }else{
        return 1;
        console.log('%cagregarinventario.component.ts line:94 this.existe', 'color: #007acc;', this.existe);
      }
    },(err) => {
      if(err.status === 404){
        Swal.fire({
          icon: 'error',
          allowOutsideClick: false,
          title: 'Error al buscar el producto.',
          text: 'Este producto no se encuentra registrado en tabla Inventario.',
        })
      }
    })
  } */


  buscarCodigo(codigo1:string){
    const sucurs = this.suc;
    this.getProducto(codigo1,sucurs);    
  }

  regresarPagina(){
    return this.router.navigateByUrl('/home/inventarios');
  }
}
