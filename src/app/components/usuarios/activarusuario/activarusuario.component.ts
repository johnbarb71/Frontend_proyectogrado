import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from "src/app/services/auth.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-activarusuario',
  templateUrl: './activarusuario.component.html',
  styleUrls: ['./activarusuario.component.css']
})
export class ActivarusuarioComponent implements OnInit {

  usuario  = new UsuarioModel();
  usuarios: [] = [];

  constructor(private auth:AuthService, private router:ActivatedRoute, private router1: Router, private location:Location) { 
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
      this.router1.navigateByUrl('/home/usuario/users/activar');
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
        this.router1.navigateByUrl('/home/usuario/users/activar');
      }
    }
    );
   }

   guardar(form:NgForm){
    if (form.invalid) {
      return;
    }
    
    this.auth.updPassUsuario(this.usuario).subscribe( resp => 
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
      return;
  }

  regresarPagina(){
    this.location.back();
  }

}
