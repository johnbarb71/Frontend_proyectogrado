import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SucursalModel } from 'src/app/models/sucursal.model';
import { AuthService } from 'src/app/services/auth.service';
import { SucursalService } from 'src/app/services/sucursal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sucursal',
  templateUrl: './sucursal.component.html',
  styleUrls: ['./sucursal.component.css']
})
export class SucursalComponent implements OnInit {

  sucursales:SucursalModel [] = [];
  sucursalesDisponibles:SucursalModel [] = [];
  sucursalesMostrar:SucursalModel [] = [];
  sucursalesdisp:[] = [];

  constructor(private sucur:SucursalService, private auth:AuthService, private router:Router) { }

  ngOnInit(): void {
    this.sucur.getSucursales().subscribe((resp:any)=>{  
      this.sucursales = resp;
      this.sucursalesdisp = this.auth.leerSucu();
      for (let sucursal of this.sucursalesdisp){
        for (let index = 0; index < this.sucursales.length; index++) {
          const element = this.sucursales[index]['id'];
          if(element === sucursal['id_sucursal']){
            this.sucursalesDisponibles.push(this.sucursales[index]);
          }
        }
      }
    })
    Swal.fire({
      icon: 'info',
      title: '¡Seleccione una sucursal!',
      text: 'Por favor escoja una sucursal en la cual se encuentre asignado.',
    })
  }

  seleccion(form:NgForm){
    if(form.value['sucursalesMostrar']==''){
      return;
    }
    this.auth.guardarSucAct(form.value['sucursalesMostrar']);
    this.router.navigateByUrl('home/inicio');
  }



}
