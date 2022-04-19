import { Component, OnInit } from '@angular/core';
import { RouterLinkActive, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { ProveedorModel } from 'src/app/models/proveedor.model';
import { ProductosService } from 'src/app/services/productos.service';
import { ProductoModel } from 'src/app/models/producto.model';
import { SucursalService } from 'src/app/services/sucursal.service';
import { SucursalModel } from 'src/app/models/sucursal.model';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class ShareInicioComponent implements OnInit {

  usuarios: UsuarioModel []=[];
  proveedores: ProveedorModel []=[];
  productos: ProductoModel []=[];
  sucursales: SucursalModel []=[];

  constructor(private auth:AuthService, private proveed:ProveedorService, private produ:ProductosService, private sucu:SucursalService) {
    
   }

  ngOnInit(): void {
    this.auth.getUsuarios().subscribe((resp:any)=>{
      this.usuarios = resp;
    });
    this.proveed.getProveedores().subscribe((resp:any)=>{
      this.proveedores = resp;
    });
    this.produ.getProductos().subscribe((resp:any)=>{
      this.productos = resp;
    })
    this.sucu.getSucursales().subscribe((resp:any)=>{
      this.sucursales =resp;
    })
  }

  

}
