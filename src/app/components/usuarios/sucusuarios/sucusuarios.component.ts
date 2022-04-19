import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from "src/app/services/auth.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sucusuarios',
  templateUrl: './sucusuarios.component.html',
  styleUrls: ['./sucusuarios.component.css']
})
export class SucusuariosComponent implements OnInit {

  usuarios:UsuarioModel [] = [];

  constructor(private auth:AuthService, private router:Router) { }

  ngOnInit(): void {
    this.auth.getUsuarios().subscribe((resp:any)=>{
      console.log('%ceditarusuario.component.ts line:23 resp', 'color: #007acc;', resp);
      this.usuarios = resp;
      console.log('%ceditarusuarios.component.ts line:22 this.usuarios', 'color: #007acc;', this.usuarios);
    })
  }

  //Función para mensaje de prohibido en la edición del usuario ID = 1
  prohibido():void{
    Swal.fire({
      allowOutsideClick: false,
      title: 'Upsss',
      text: 'Esta cuenta no se puede modificar',
    })
  }

  // Método para buscar el ID del usuario y redireccionar
  buscarId(termino:string){
    this.router.navigate(['/home/usuario/sucursal',termino]);
  };

}
