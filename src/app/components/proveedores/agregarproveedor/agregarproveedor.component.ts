import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { ProveedorModel } from 'src/app/models/proveedor.model';
import { ProveedorService } from "src/app/services/proveedor.service";
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregarproveedor',
  templateUrl: './agregarproveedor.component.html',
  styleUrls: ['./agregarproveedor.component.css']
})
export class AgregarproveedorComponent implements OnInit {

  proveedor = new ProveedorModel();

  constructor(private location:Location, private router:Router, private proveed:ProveedorService) { }

  ngOnInit(): void {
  }

  guardar(form:NgForm){
    if (form.invalid) {
      console.log('%cagregarproveedor.component.ts line:25 object', 'formulario no valido');
      return;
    }
    this.proveed.agregarProveedor(this.proveedor).subscribe(resp => {
      console.log('%cagregarproveedor.component.ts line:29 resp', 'color: #007acc;', resp);
      if(resp['message'] === 'Proveedor creado'){
        Swal.fire({
          allowOutsideClick: false,
          title: '¡Proveedor creado!',
          text: 'Proveedor creado con éxito.',
        })
      }
      form.reset();
    },(err) => {
      if(err.error.error.message === 'The nombre field is required.'){
        Swal.fire({
          icon: 'error',
          allowOutsideClick: false,
          title: 'Error al crear proveedor.',
          text: 'El nombre es requerido.',
        })
        return;
      }
      Swal.fire({
        icon: 'error',
        allowOutsideClick: false,
        title: 'Error al crear proveedor.',
        text: err.error.error,
      })
      form.reset();
      return;
    })
  }

  regresarPagina(){
    return this.router.navigateByUrl('/home/proveedor');
  }

}
