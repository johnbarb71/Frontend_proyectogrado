import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { RoleModel } from 'src/app/models/role.model';
import { RoleService } from 'src/app/services/role.service';
import { AuthService } from "src/app/services/auth.service";
import { SucUsuModel } from 'src/app/models/sucursal_usuario.model';
import { SucursalService } from 'src/app/services/sucursal.service';
import { SucursalModel } from 'src/app/models/sucursal.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sucusuario',
  templateUrl: './sucusuario.component.html',
  styleUrls: ['./sucusuario.component.css']
})
export class SucusuarioComponent implements OnInit {

  usuario  = new UsuarioModel();
  sucUsu1 = new SucUsuModel();
  sucUsu2 = new SucUsuModel();
  usuarios: [] = [];
  roles:RoleModel [] = [];
  sucUsu:SucUsuModel [] = [];
  sucursales:SucUsuModel [] = [];

  constructor(private sucus:SucursalService, private auth:AuthService, private router:ActivatedRoute, private router1: Router, private location:Location, private rol:RoleService) { }

  ngOnInit(): void {
    this.router.params.subscribe( params => {
      this.getUsuario(params['id']);
      this.getSucUsuario(params['id']);
      this.getSucursales();
      
    })
  }

  guardar(form:NgForm){
    if (form.invalid) {
      return;
    }
    this.sucUsu1.id_user = this.usuario.id;
    this.sucus.getSucursalUsuarioExiste(this.sucUsu1).subscribe(resp=>{
      if(resp['message'] === 'existe'){
        Swal.fire({
          allowOutsideClick: false,
          title: '¡Usuario en sucursal!',
          text: 'Usuario ya se encuentra en la sucursal.',
        })
        form.reset(); 
      }else{
        this.sucus.agregarSucursalUsuario(this.sucUsu1).subscribe(resp=>{
          if(resp['message'] === 'Sucursal-Usuario creado'){
            Swal.fire({
              allowOutsideClick: false,
              title: '¡Usuario actualizado!',
              text: 'Usuario creado con éxito en la sucursal.',
            })
            this.router1.navigateByUrl('/home/usuario/sucursal');
            form.reset();
          }
        })
      }
    })
  }

  eliminar(form:NgForm){
    if (form.invalid) {
      return;
    }
    this.sucUsu2.id_user = this.usuario.id;
    this.sucus.borrarSucursalUsuario(this.sucUsu2).subscribe(resp=>{
      Swal.fire({
        allowOutsideClick: false,
        title: '¡Usuario eliminado!',
        text: 'Usuario eliminado con éxito en la sucursal.',
      })
      this.router1.navigateByUrl('/home/usuario/sucursal');
      form.reset();
    })
  }

  getUsuario( id : string ){
    this.auth.getUsuario(id).subscribe( (resp:any) => {
      this.usuario = resp;
      console.log('%csucusuario.component.ts line:45 this.usuario', 'color: #007acc;', this.usuario);     
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

   getSucUsuario( id : string ){
    this.sucus.getSucursalUsuario(id).subscribe( (resp:any) => {
      this.sucUsu = resp;
      console.log('%csucusuario.component.ts line:64 this.sucUsu', 'color: #007acc;', this.sucUsu);  
    });
   }

   getSucursales(){
    this.sucus.getSucursales().subscribe( (resp:any) => {
      this.sucursales = resp;
      console.log('%csucusuario.component.ts line:71 this.sucursales', 'color: #007acc;', this.sucursales);     
    });
   }

  regresarPagina(){
    this.location.back();
  }

}
