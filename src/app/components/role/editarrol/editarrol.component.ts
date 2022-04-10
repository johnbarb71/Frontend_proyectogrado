import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleModel } from 'src/app/models/role.model';
import { RoleService } from 'src/app/services/role.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editarrol',
  templateUrl: './editarrol.component.html',
  styleUrls: ['./editarrol.component.css']
})
export class EditarrolComponent implements OnInit {

  role = new RoleModel();

  constructor(private router:ActivatedRoute, private router1: Router, private location:Location, private rol:RoleService) {
    this.router.params.subscribe( params =>{
      this.getRole(params['id']);
    })
   }


  ngOnInit(): void {
  }

  getRole(id:string){
    this.rol.getRol(id).subscribe((resp:any) => {
      this.role = resp;
      
    },(err) => {
      
      if(err.status === 404){
        Swal.fire({
          icon: 'error',
          allowOutsideClick: false,
          title: 'Error al buscar el rol.',
          text: 'Este rol no se encuentra registrado.',
        })
        this.router1.navigateByUrl('/home/roles/editar');
      }
    })
  }

  guardar(form:NgForm){
    if(form.invalid){
      return;
    }
    this.rol.updRole(this.role).subscribe(resp=>{
      
      if(resp['message'] === 'Rol actualizado correctamente'){
        Swal.fire({
          allowOutsideClick: false,
          title: '¡Rol modificado!',
          text: 'Rol modificado con éxito.',
        })
      }
    },(err) => {
      /* console.log('%ceditarproveedor.component.ts line:49 err.error', 'color: #007acc;', err.error.error.message[0]); */
      if(err.error.message === 'The nombre field is required.'){
        Swal.fire({
          icon: 'error',
          allowOutsideClick: false,
          title: 'Error al modificar rol.',
          text: 'Debe colocar el nombre del rol.',
        })
        return;
      }
      Swal.fire({
        icon: 'error',
        allowOutsideClick: false,
        title: 'Error al modificar rol.',
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
