import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { SucursalModel } from 'src/app/models/sucursal.model';
import { SucursalService } from 'src/app/services/sucursal.service';

@Component({
  selector: 'app-agregarsucursal',
  templateUrl: './agregarsucursal.component.html',
  styleUrls: ['./agregarsucursal.component.css']
})
export class AgregarsucursalComponent implements OnInit {

  sucursal = new SucursalModel;

  constructor(private location:Location, private router:Router,private sucurs:SucursalService) { }

  ngOnInit(): void {

  }

  guardar(form:NgForm){
    if (form.invalid) {
      return ;
    }
    this.sucurs.agregarSucursal(this.sucursal).subscribe(resp => {
      if(resp['message'] === 'Sucursal creado'){
        Swal.fire({
          allowOutsideClick: false,
          title: '¡Sucursal creado!',
          text: 'Sucursal creado con éxito.',
        })
      }
      return this.router.navigateByUrl('/home/sucursales');
    },(err) => {
      if(err.error.error.message === 'The nombre field is required.'){
        Swal.fire({
          icon: 'error',
          allowOutsideClick: false,
          title: 'Error al crear sucursal.',
          text: 'El nombre es requerido.',
        })
        return this.router.navigateByUrl('/home/sucursales');
      }
      Swal.fire({
        icon: 'error',
        allowOutsideClick: false,
        title: 'Error al crear sucursal.',
        text: err.error.error,
      })
      return this.router.navigateByUrl('/home/sucursales');
      
    })
  }

  regresarPagina(){
    return this.router.navigateByUrl('/home/sucursales');
  }

}
