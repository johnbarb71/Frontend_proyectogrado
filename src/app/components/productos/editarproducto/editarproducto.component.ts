import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { ProductoModel } from 'src/app/models/producto.model';
import { ProductosService } from 'src/app/services/productos.service';
import { ProveedorModel } from 'src/app/models/proveedor.model';
import { ProveedorService } from "src/app/services/proveedor.service";
import Swal from 'sweetalert2';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-editarproducto',
  templateUrl: './editarproducto.component.html',
  styleUrls: ['./editarproducto.component.css']
})
export class EditarproductoComponent implements OnInit {

  producto = new ProductoModel();
  proveedores:ProveedorModel [] = [];

  constructor(private router1:ActivatedRoute,private proveed:ProveedorService, private location:Location, private router:Router, private produc:ProductosService) {
    this.router1.params.subscribe(params => {
      this.getProducto(params['id']);
    })
   }

  ngOnInit(): void {
    this.proveed.getProveedores().subscribe((resp:any)=>{
      this.proveedores = resp;
    })
  }

  getProducto(id:string){
    this.produc.getProducto(id).subscribe((resp:any) => {
      this.producto = resp;
      console.log('%ceditarproducto.component.ts line:36 this.producto', 'color: #007acc;', this.producto);
    },(err) => {
      /* console.log('%ceditarusuario.component.ts line:43 err.status', 'color: #007acc;', err.status); */
      if(err.status === 404){
        Swal.fire({
          icon: 'error',
          allowOutsideClick: false,
          title: 'Error al buscar el proveedor.',
          text: 'Este proveedor no se encuentra registrado.',
        })
        this.router.navigateByUrl('/home/producto/editar');
      }
    })
  }

  guardar(form:NgForm){
    if(form.invalid){
      return;
    }
    this.producto.linea = Number(this.producto.linea);
    this.produc.updProducto(this.producto).subscribe(resp=>{
      console.log('%ceditarproducto.component.ts line:56 this.producto', 'color: #007acc;', this.producto);
      if(resp['message'] === 'Producto actualizado correctamente'){
        Swal.fire({
          allowOutsideClick: false,
          title: '¡Producto actualizado!',
          text: 'Proveedor actualizado con éxito.',
        })
      }
    },(err) => {
      
      if(err.error.message === 'The nombre field is required.'){
        Swal.fire({
          icon: 'error',
          allowOutsideClick: false,
          title: 'Error al modificar producto.',
          text: 'Debe colocar el nombre del producto.',
        })
        return;
      }
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

  regresarPagina(){
    return this.router.navigateByUrl('/home/productos/editar');
  }

}
