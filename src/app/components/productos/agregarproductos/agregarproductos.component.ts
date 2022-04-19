import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { ProductoModel } from 'src/app/models/producto.model';
import { ProductosService } from 'src/app/services/productos.service';
import { ProveedorModel } from 'src/app/models/proveedor.model';
import { ProveedorService } from "src/app/services/proveedor.service";
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregarproductos',
  templateUrl: './agregarproductos.component.html',
  styleUrls: ['./agregarproductos.component.css']
})
export class AgregarproductosComponent implements OnInit {

  producto = new ProductoModel();
  proveedores:ProveedorModel [] = [];
  
  constructor(private proveed:ProveedorService, private location:Location, private router:Router, private produc:ProductosService) { }

  ngOnInit(): void {
    this.proveed.getProveedores().subscribe((resp:any)=>{
      this.proveedores = resp;
    })
  }

  guardar(form:NgForm){
    console.log('%cagregarproductos.component.ts line:30 form.value', 'color: #007acc;', form.value);
    if (form.invalid) {
      console.log('%cagregarproveedor.component.ts line:25 object', 'formulario no valido');
      return;
    }
    console.log('%cagregarproductos.component.ts line:34 form.value', 'color: #007acc;', form.value);
    this.produc.agregarProducto(this.producto).subscribe(resp => {
      console.log('%cagregarproducto.component.ts line:29 resp', 'color: #007acc;', resp);
      if(resp['message'] === 'Producto creado'){
        Swal.fire({
          allowOutsideClick: false,
          title: '¡Producto creado!',
          text: 'Producto creado con éxito.',
        })
        form.reset(); 
      }
    },(err) => {
      if(err.status === 400){
        Swal.fire({
          icon: 'error',
          allowOutsideClick: false,
          title: 'Faltan campos.',
          text: 'El nombre es requerido.',
        })
        return;
      }
      Swal.fire({
        icon: 'error',
        allowOutsideClick: false,
        title: 'Error al crear producto.',
        text: err.status,
      })
      console.log('%cagregarproductos.component.ts line:53 err', 'color: #007acc;', err);
      
      return;
    })
  }

  regresarPagina(){
    return this.router.navigateByUrl('/home/productos');
  }

}
