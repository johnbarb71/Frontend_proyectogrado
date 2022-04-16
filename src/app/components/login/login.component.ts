import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel = new UsuarioModel;
  sesionVigente = false;
  sucursales:string;

  constructor(private auth:AuthService, private router:Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('email')){
      this.usuario.email = localStorage.getItem('email') || '';
      this.sesionVigente = true;
    }
  }

  Login(form:NgForm){
    if(form.invalid){
      return;
    }
    Swal.fire({
      allowOutsideClick: false,
      title: 'Iniciando sesión',
      text: 'Espere por favor...',
    });
    Swal.showLoading();
    this.auth.login(this.usuario).subscribe(resp=>{
      if(this.sesionVigente){
        localStorage.setItem('email',this.usuario.email);
        this.sucursales = this.auth.leerSucu();
        /* this.escogerSuc(this.sucursales); */
      }
      this.router.navigateByUrl('/sucursal'); 
    },(err)=>{
      if(err.error.message === 'Login failed'){
        Swal.fire({
          allowOutsideClick: false,
          title: 'Error al autenticar',
          text: 'Usuario o contraseña invalida',
        })
        return;
      }
      if(err.error.message === 'Usuario no activo'){
        Swal.fire({
          allowOutsideClick: false,
          title: 'Usuario no activo',
          text: 'Usuario no está activo, por favor informe al administrador.',
        })
        return;
      }
    });
    Swal.close();
    
  }

  /* private escogerSuc(sucursales:string){
    for (let sucursal of sucursales){
      console.log('%clogin.component.ts line:69 sucursal', 'color: #007acc;', sucursal['id_sucursal']); 
    }
  } */

  
}
