import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel = new UsuarioModel();

  constructor( private auth:AuthService, private router:Router) { }

  ngOnInit(): void {
    this.usuario = new UsuarioModel();
  }

  OnSubmit(form: NgForm){
    if(form.invalid){ 
      return; 
    }
    this.auth.registrarUsuario(this.usuario).subscribe( resp => 
      {
        console.log('%cregistro.component.ts line:25 resp', 'color: #007acc;', resp['message']);
        if(resp['message'] === 'User created'){
          Swal.fire({
            allowOutsideClick: false,
            title: '¡Usuario creado!',
            text: 'Usuario creado con éxito, por favor contacte con el administrador para activar su perfil.',
          })
          this.router.navigateByUrl('/');
        }
      },(err) => {
        if(err.error.error.email[0] === 'The email has already been taken.'){
          Swal.fire({
            allowOutsideClick: false,
            title: 'Error al crear usuario.',
            text: 'Este correo se encuentra registrado.',
          })
          return;
        }
        Swal.fire({
          allowOutsideClick: false,
          title: 'Error al crear usuario.',
          text: err.error.error,
        })
        return;
      });
  }

}
