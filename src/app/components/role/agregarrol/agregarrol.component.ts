import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { RoleModel } from 'src/app/models/role.model';
import { RoleService } from "src/app/services/role.service";

@Component({
  selector: 'app-agregarrol',
  templateUrl: './agregarrol.component.html',
  styleUrls: ['./agregarrol.component.css']
})
export class AgregarrolComponent implements OnInit {

  role = new RoleModel;

  constructor(private location:Location, private router:Router, private rol:RoleService) { }

  ngOnInit(): void {
  }

  guardar(form:NgForm){
    if (form.invalid) {
      console.log('%cagregarrol.component.ts line:25 form.value', 'color: #007acc;', form.value);
      return ;
    }
    this.rol.agregarRole(this.role).subscribe(resp => {
      console.log('%cagregarrol.component.ts line:29 resp', 'color: #007acc;', resp);
      if(resp['message'] === 'Role creado'){
        Swal.fire({
          allowOutsideClick: false,
          title: '¡Rol creado!',
          text: 'Rol creado con éxito.',
        })
      }
      return this.router.navigateByUrl('/home/roles');
    },(err) => {
      if(err.error.error.message === 'The nombre field is required.'){
        Swal.fire({
          icon: 'error',
          allowOutsideClick: false,
          title: 'Error al crear rol.',
          text: 'El nombre es requerido.',
        })
        return this.router.navigateByUrl('/home/roles');
      }
      Swal.fire({
        icon: 'error',
        allowOutsideClick: false,
        title: 'Error al crear rol.',
        text: err.error.error,
      })
      console.log('%cagregarrol.component.ts line:53 object OLR CREADO');
      return this.router.navigateByUrl('/home/roles');
      
    })
  }

  regresarPagina(){
    return this.router.navigateByUrl('/home/roles');
  }

}
