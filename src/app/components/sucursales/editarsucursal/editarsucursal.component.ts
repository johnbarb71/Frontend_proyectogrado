import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SucursalModel } from 'src/app/models/sucursal.model';
import { SucursalService } from 'src/app/services/sucursal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editarsucursal',
  templateUrl: './editarsucursal.component.html',
  styleUrls: ['./editarsucursal.component.css']
})
export class EditarsucursalComponent implements OnInit {

  sucursal = new SucursalModel();

  constructor(private router:ActivatedRoute, private router1: Router, private location:Location, private sucurs:SucursalService) {
    this.router.params.subscribe(params => {
      this.getSucursal(params['id']);
    })
   }

  ngOnInit(): void {
  }

  getSucursal(id:string){
    this.sucurs.getSucursal(id).subscribe((resp:any) => {
      this.sucursal = resp;
      
    },(err) => {
      
      if(err.status === 404){
        Swal.fire({
          icon: 'error',
          allowOutsideClick: false,
          title: 'Error al buscar sucursal.',
          text: 'Esta sucursal no se encuentra registrado.',
        })
        this.router1.navigateByUrl('/home/sucursales/editar');
      }
    })
  }

  guardar(form:NgForm){
    if(form.invalid){
      return;
    }
    this.sucurs.updSucursal(this.sucursal).subscribe(resp=>{
      
      if(resp['message'] === 'Sucursal actualizado correctamente'){
        Swal.fire({
          allowOutsideClick: false,
          title: '¡Sucursal modificado!',
          text: 'Sucursal modificado con éxito.',
        })
      }
    },(err) => {
      /* console.log('%ceditarproveedor.component.ts line:49 err.error', 'color: #007acc;', err.error.error.message[0]); */
      if(err.error.message === 'The nombre field is required.'){
        Swal.fire({
          icon: 'error',
          allowOutsideClick: false,
          title: 'Error al modificar sucursal.',
          text: 'Debe colocar el nombre del sucursal.',
        })
        return;
      }
      Swal.fire({
        icon: 'error',
        allowOutsideClick: false,
        title: 'Error al modificar sucursal.',
        text: err.error.error,
      })
      return;
    });
    return;
    }

  

  regresarPagina(){
    this.location.back();
  }


}
