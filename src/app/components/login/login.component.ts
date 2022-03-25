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
      }
      this.router.navigateByUrl('/home');
    },(err)=>{
      if(err.error.message === 'Login failed'){
        Swal.fire({
          allowOutsideClick: false,
          title: 'Error al autenticar',
          text: 'Usuario o contraseña invalida',
        })
        return;
      }
    });
    Swal.close();
    
  }

}
