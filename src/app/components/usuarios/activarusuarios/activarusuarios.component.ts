import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from "src/app/services/auth.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-activarusuarios',
  templateUrl: './activarusuarios.component.html',
  styleUrls: ['./activarusuarios.component.css']
})
export class ActivarusuariosComponent implements OnInit {

  usuarios:UsuarioModel [] = [];

  constructor(private auth:AuthService, private router:Router) { }

  ngOnInit(): void {
    this.auth.getUsuarios().subscribe((resp:any)=>{
      this.usuarios = resp;
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
    this.router.navigate(['/home/usuario/users/activar',termino]);
  };

  regresarPagina(){
    return this.router.navigateByUrl('/home/usuario');
  }

}
