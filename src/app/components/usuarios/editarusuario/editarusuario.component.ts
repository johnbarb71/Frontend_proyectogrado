import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { RoleModel } from 'src/app/models/role.model';
import { RoleService } from 'src/app/services/role.service';
import { AuthService } from "src/app/services/auth.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editarusuario',
  templateUrl: './editarusuario.component.html',
  styleUrls: ['./editarusuario.component.css']
})
export class EditarusuarioComponent implements OnInit {
  
  usuario  = new UsuarioModel();
  usuarios: [] = [];
  roles:RoleModel [] = [];

  constructor(private auth:AuthService, private router:ActivatedRoute, private router1: Router, private location:Location, private rol:RoleService) {
    this.router.params.subscribe( params => {
      this.getFormato(params['id']);
    })
    
   }

  ngOnInit(): void {
    this.rol.getRoles().subscribe((resp:any)=>{this.roles=resp;});
  }

  getFormato( id : string ){
    if(id == '1'){
      Swal.fire({
        icon: 'error',
        allowOutsideClick: false,
        title: '¡Error!',
        text: 'Esto no es permitido',
      })
      this.router1.navigateByUrl('/home/usuario/users/editar');
    }
    this.auth.getUsuario(id).subscribe( (resp:any) => {
      console.log(resp.role);
      this.usuario = resp;      
    },(err) => {
      console.log('%ceditarusuario.component.ts line:43 err.status', 'color: #007acc;', err.status);
      if(err.status === 404){
        Swal.fire({
          icon: 'error',
          allowOutsideClick: false,
          title: 'Error al buscar usuario.',
          text: 'Este usuario no se encuentra registrado.',
        })
        this.router1.navigateByUrl('/home/usuario/users/editar');
      }
    }
    );
   }

  guardar(form:NgForm){
    if (form.invalid) {
      return;
    }
    if(form.pristine){
      if(form.value['estado']===1){
        this.usuario.estado = 1;
      }else{
        this.usuario.estado = 0;
      }
      /* switch(form.value['rol']) {
        case 2:
          this.usuario.role = 2;
          break;
        case 1:
          this.usuario.role = 1;
          break;
        default:
          this.usuario.role = 0;
      } */
      this.usuario.role = Number(this.usuario.role);
    }else{
      switch(form.value['estado']) {
        case 0:
          this.usuario.estado = 0;
          break;
        case 1:
          this.usuario.estado = 1;
          break;
        case true:
          this.usuario.estado = 1;
          break;
        default:
          this.usuario.estado = 0;
      }
      
      /* switch(form.value['rol']) {
        case '2':
          this.usuario.role = 2;
          break;
        case '1':
          this.usuario.role = 1;
          break;
        case 2:
          this.usuario.role = 2;
          break;
        case 1:
          this.usuario.role = 1;
          break;
        default:
          this.usuario.role = 0;
      } */
      this.usuario.role = Number(this.usuario.role);
    }
    this.auth.updUsuario(this.usuario).subscribe( resp => 
      {
        if(resp['message'] === 'Usuario actualizado correctamente'){
          Swal.fire({
            allowOutsideClick: false,
            title: '¡Usuario modificado!',
            text: 'Usuario modificado con éxito.',
          })
        }
      },(err) => {
        if(err.error.error.email[0] === 'The email has already been taken.'){
          Swal.fire({
            icon: 'error',
            allowOutsideClick: false,
            title: 'Error al modificar usuario.',
            text: 'Este correo se encuentra registrado.',
          })
          return;
        }
        Swal.fire({
          icon: 'error',
          allowOutsideClick: false,
          title: 'Error al modificar usuario.',
          text: err.error.error,
        })
        return;
      });
      /* this.router1.navigateByUrl('/home/usuario/users/editar');   */
      return;
  }

  regresarPagina(){
    this.location.back();
  }
}
