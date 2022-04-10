import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProveedorModel } from 'src/app/models/proveedor.model';
import { ProveedorService } from "src/app/services/proveedor.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements OnInit {

  proveedores:ProveedorModel [] = [];

  constructor(private proveed:ProveedorService, private router:Router) { }

  ngOnInit(): void {
    /* this.proveed.getProveedores().subscribe((resp:any)=>{
      this.proveedores = resp;
    }) */
  }


}
