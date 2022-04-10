import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from "src/app/services/auth.service";
import { RoleModel } from 'src/app/models/role.model';
import { RoleService } from 'src/app/services/role.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregarusuario',
  templateUrl: './agregarusuario.component.html',
  styleUrls: ['./agregarusuario.component.css']
})
export class AgregarusuarioComponent implements OnInit {

  usuario = new UsuarioModel();
  roles:RoleModel [] = [];

  constructor(private auth: AuthService,private location:Location, private router:Router, private rol:RoleService) { }

  ngOnInit(): void {
    this.rol.getRoles().subscribe((resp:any)=>{this.roles=resp;})
  }

  guardar(form:NgForm){
    if (form.invalid) {
      console.log('%cagregarusuario.component.ts line:21 object', 'formulario no valido');
      return;
    }
    if(form.value['estado']===true){
      this.usuario.estado = 1;
    }else{
      this.usuario.estado = 0;
    }
    /* switch(form.value['rol']) {
      case 0:
        this.usuario.role = 0;
        break;
      case 1:
        this.usuario.role = 1;
        break;
      default:
        this.usuario.role = 2;
    } */
    this.usuario.role = Number(this.usuario.role);
    console.log('%cagregarusuario.component.ts line:43 this.usuario', 'color: #007acc;', this.usuario); 
    this.auth.crearUsuario(this.usuario).subscribe( resp => 
      {
        console.log('%cregistro.component.ts line:25 resp', 'color: #007acc;', resp['message']);
        if(resp['message'] === 'User created'){
          Swal.fire({
            allowOutsideClick: false,
            title: '¡Usuario creado!',
            text: 'Usuario creado con éxito.',
          })
        }
      },(err) => {
        if(err.error.error.email[0] === 'The email has already been taken.'){
          Swal.fire({
            icon: 'error',
            allowOutsideClick: false,
            title: 'Error al crear usuario.',
            text: 'Este correo se encuentra registrado.',
          })
          return;
        }
        Swal.fire({
          icon: 'error',
          allowOutsideClick: false,
          title: 'Error al crear usuario.',
          text: err.error.error,
        })
        return;
      });
      form.resetForm();

  }

  regresarPagina(){
    return this.router.navigateByUrl('/home/usuario');
  }


}
