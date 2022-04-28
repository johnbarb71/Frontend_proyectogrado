import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductoModel } from 'src/app/models/producto.model';
import { ProductosService } from "src/app/services/productos.service";
import { ProveedorModel } from 'src/app/models/proveedor.model';
import { ProveedorService } from "src/app/services/proveedor.service";
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-consultarproductos',
  templateUrl: './consultarproductos.component.html',
  styleUrls: ['./consultarproductos.component.css']
})
export class ConsultarproductosComponent implements OnInit {

  proveedores:ProveedorModel [] = [];
  productos:ProductoModel []=[];
  public pagina: number = 1;
  public itemxpagina: number = 50;
  public total: number;

  constructor(private proveed:ProveedorService,private router:Router, private produc:ProductosService) { }

  ngOnInit(): void {
    this.proveed.getProveedores().subscribe((resp1:any)=>{
      this.proveedores = resp1;
    });
    this.produc.getProductos().subscribe((resp:any)=>{
      this.productos = resp;
    });
    
  }

  buscarxlinea(linea:string){
    this.produc.getproductxlinea(linea).subscribe((resp:any)=>{
      this.productos = resp;
    },(err) => {
      /* console.log('%ceditarusuario.component.ts line:43 err.status', 'color: #007acc;', err.status); */
      if(err.status === 404){
        Swal.fire({
          icon: 'error',
          allowOutsideClick: false,
          title: 'Producto no encontrado.',
          text: 'El código de barras no existe.',
        })
      }
    })
  }

  buscarCodigo(codigo1:string){
    this.produc.getProductoCodigo(codigo1).subscribe((resp:any)=>{
      this.productos = resp;
    },(err) => {
      /* console.log('%ceditarusuario.component.ts line:43 err.status', 'color: #007acc;', err.status); */
      if(err.status === 404){
        Swal.fire({
          icon: 'error',
          allowOutsideClick: false,
          title: 'Producto no encontrado.',
          text: 'Intente buscar con otro proveedor.',
        })
      }
    })
  }


  buscarId(id:string){
    this.router.navigate(['/home/productos/consultar',id]);
  }

  regresarPagina(){
    return this.router.navigateByUrl('/home/productos');
  }

}
