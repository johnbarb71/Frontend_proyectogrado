import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioModel } from 'src/app/models/usuario.model';
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

  constructor(private auth:AuthService, private router:ActivatedRoute, private router1: Router, private location:Location,) {
    this.router.params.subscribe( params => {
      this.getFormato(params['id']);
    })
    
   }

  ngOnInit(): void {
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
      console.log('%cagregarusuario.component.ts line:25 object', 'formulario no valido');
      return;
    }
    console.log('%ceditarusuario.component.ts line:63 form.value', 'color: #007acc;', form.value);
    if(form.pristine){
      console.log('%ceditarusuario.component.ts line:65 object estado rtocado', 'color: #407acc;');
      if(form.value['estado']===1){
        this.usuario.estado = 1;
      }else{
        this.usuario.estado = 0;
      }
      switch(form.value['rol']) {
        case 2:
          this.usuario.role = 2;
          break;
        case 1:
          this.usuario.role = 1;
          break;
        default:
          this.usuario.role = 0;
      }
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
      console.log('%ceditarusuario.component.ts line:85', 'color: white; background-color: #007acc;',form.value);
      console.log('%ceditarusuario.component.ts line:86 this.usuario', 'color: white; background-color: #007acc;', this.usuario);
      switch(form.value['rol']) {
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
      }
    }
    
    
    console.log('%ceditarusuario.component.ts line:78 this.usuario', 'color: #007acc;', this.usuario);
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
