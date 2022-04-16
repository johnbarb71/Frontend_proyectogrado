import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductoModel } from 'src/app/models/producto.model';
import { ProductosService } from "src/app/services/productos.service";
import { ProveedorModel } from 'src/app/models/proveedor.model';
import { ProveedorService } from "src/app/services/proveedor.service";
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-editarproductos',
  templateUrl: './editarproductos.component.html',
  styleUrls: ['./editarproductos.component.css']
})
export class EditarproductosComponent implements OnInit {

  productos:ProductoModel []=[];
  proveedores:ProveedorModel []=[];
  public pagina: number = 1;
  public itemxpagina: number = 50;
  public total: number;
  cargando = false;

  constructor(private router:Router, private produc:ProductosService,private proveed:ProveedorService) {
    

   }

  ngOnInit(): void {
    this.cargando = true;
    this.loading();
    this.produc.getProductos().subscribe((resp:any)=>{
      this.productos = resp;
    })
    this.proveed.getProveedores().subscribe((resp1:any)=>{
      this.proveedores = resp1;
      delay(1000);      
      this.cargando = false;
    })
  }

  // Método para buscar el ID del producto y redireccionar
  buscarId(termino:string){
    this.router.navigate(['/home/productos/editar',termino]);
  };

  //Método para mostrar sweetalert para la carga de Proveedores
  private loading():void{
    let timerInterval;
    Swal.fire({
      title: 'Cargando',
      timer: 1500,
      didOpen: () => {
        Swal.showLoading()
      },
      willClose: () => {
        clearInterval(timerInterval)
      }
    })
  }

  //Método buscar producto por barras
  buscarCodigo(codigo1:string){
    console.log('%ceditarproductos.component.ts line:65 codigo1', 'color: #007acc;', codigo1);
    this.produc.getProductoCodigo(codigo1).subscribe((resp:any)=>{
      this.productos = resp;
    })

  }
  buscarNombre(nombre:string){
    this.produc.getproductonombre(nombre).subscribe((resp:any)=>{
      console.log('%ceditarproductos.component.ts line:73 resp', 'color: #007acc;', resp);
      this.productos = resp;
    },(err) => {
      /* console.log('%ceditarusuario.component.ts line:43 err.status', 'color: #007acc;', err.status); */
      if(err.status === 404){
        Swal.fire({
          icon: 'error',
          allowOutsideClick: false,
          title: 'Producto no encontrado.',
          text: 'Intente buscar con otra palabra característica del producto.',
        })
      }
    })
  }

}
