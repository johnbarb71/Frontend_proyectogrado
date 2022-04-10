import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ProveedorModel } from 'src/app/models/proveedor.model';
import { ProveedorService } from 'src/app/services/proveedor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editarproveedor',
  templateUrl: './editarproveedor.component.html',
  styleUrls: ['./editarproveedor.component.css']
})
export class EditarproveedorComponent implements OnInit {

  proveedor = new ProveedorModel();

  constructor(private router:ActivatedRoute, private router1: Router, private location:Location,private proveed:ProveedorService) { 
    this.router.params.subscribe( params =>{
      this.getProveedor(params['id']);
    })
  }

  ngOnInit(): void {
  }

  getProveedor(id:string){
    this.proveed.getProveedor(id).subscribe((resp:any) => {
      this.proveedor = resp;
      /* console.log('%ceditarproveedor.component.ts line:32 this.proveedor', 'color: #007acc;', this.proveedor); */
    },(err) => {
      /* console.log('%ceditarusuario.component.ts line:43 err.status', 'color: #007acc;', err.status); */
      if(err.status === 404){
        Swal.fire({
          icon: 'error',
          allowOutsideClick: false,
          title: 'Error al buscar el proveedor.',
          text: 'Este proveedor no se encuentra registrado.',
        })
        this.router1.navigateByUrl('/home/proveedor/editar');
      }
    })
  }

  guardar(form:NgForm){
    if(form.invalid){
      return;
    }
    this.proveed.updProveedor(this.proveedor).subscribe(resp=>{
      /* console.log('%ceditarproveedor.component.ts line:40 resp', 'color: #007acc;', resp); */
      if(resp['message'] === 'Proveedor actualizado correctamente'){
        Swal.fire({
          allowOutsideClick: false,
          title: '¡Proveedor modificado!',
          text: 'Proveedor modificado con éxito.',
        })
      }
    },(err) => {
      /* console.log('%ceditarproveedor.component.ts line:49 err.error', 'color: #007acc;', err.error.error.message[0]); */
      if(err.error.message === 'The nombre field is required.'){
        Swal.fire({
          icon: 'error',
          allowOutsideClick: false,
          title: 'Error al modificar proveedor.',
          text: 'Debe colocar el nombre del proveedor.',
        })
        return;
      }
      Swal.fire({
        icon: 'error',
        allowOutsideClick: false,
        title: 'Error al modificar proveedor.',
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
