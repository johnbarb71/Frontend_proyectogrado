import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProveedorModel } from 'src/app/models/proveedor.model';
import { ProveedorService } from "src/app/services/proveedor.service";

@Component({
  selector: 'app-editarproveedores',
  templateUrl: './editarproveedores.component.html',
  styleUrls: ['./editarproveedores.component.css']
})
export class EditarproveedoresComponent implements OnInit {

  proveedores:ProveedorModel [] = [];

  constructor(private proveed:ProveedorService, private router:Router) { }

  ngOnInit(): void {
    this.proveed.getProveedores().subscribe((resp:any)=>{
      this.proveedores = resp;
    })
  }

  // Método para buscar el ID del proveedor y redireccionar
  buscarId(termino:string){
    this.router.navigate(['/home/proveedor/editar',termino]);
  };

}
