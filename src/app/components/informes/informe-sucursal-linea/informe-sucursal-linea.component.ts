import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductoModel } from 'src/app/models/producto.model';
import { ProductosService } from "src/app/services/productos.service";
import { ProveedorModel } from 'src/app/models/proveedor.model';
import { ProveedorService } from "src/app/services/proveedor.service";
import { SucursalService } from 'src/app/services/sucursal.service';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-informe-sucursal-linea',
  templateUrl: './informe-sucursal-linea.component.html',
  styleUrls: ['./informe-sucursal-linea.component.css']
})
export class InformeSucursalLineaComponent implements OnInit {

  proveedores:ProveedorModel [] = [];
  productos:ProductoModel []=[];
  public pagina: number = 1;
  public itemxpagina: number = 50;
  public total: number;
  public sucAct: string;
  DataArray: any = [];
  cargando = false;

  constructor(private proveed:ProveedorService,private router:Router, private produc:ProductosService,private sucur:SucursalService,private auth:AuthService) { }

  ngOnInit(): void {
    this.proveed.getProveedores().subscribe((resp1:any)=>{
      this.proveedores = resp1;
    });
    this.cargando = true;
    this.loading();
    this.sucAct = this.auth.leerSucuAct();
    this.produc.getInformesucursal(this.sucAct).subscribe(
      data => {
        this.DataArray = data as string[];
      },
      (error) => console.log(error)
    );
    this.cargando = false;  
  }

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

  

  buscarxlinea(id_sucursal:string,linea:string){
    this.produc.getInformesucursallinea(id_sucursal,linea).subscribe(
      data => {
        this.DataArray = data as string[];
  
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

  headRows() {
    return [{codigo: 'Código', nombre: 'Nombre', resultado: 'Resultado', cantidad: 'Cantidad', total: 'Faltante'}];
  }

  bodyRows() {
    let body = [];
    for (let producto of this.DataArray) {
      body.push({
        codigo: producto.codigo1,
        nombre: producto.nombre,
        resultado: producto.resultado,
        cantidad: producto.cantidad,
        total: producto.total
      });
    }
    return body;
  }

  public downloadPDF(){
    var doc = new jsPDF('p', 'pt');
    var totalPagesExp = '{total_pages_count_string}'
    doc.setFontSize(9);
    doc.setTextColor(100);
    autoTable(doc, {
      head: this.headRows(),
      body: this.bodyRows(),
      theme: 'grid',
      margin: { top: 25, bottom:20 },
      styles: { overflow: 'linebreak',fontSize: 6},
      showHead: "everyPage",
      didDrawPage: function (data) {
        // Header
        doc.setFontSize(10);
        doc.setTextColor(40);
        doc.text("Despensa San Agustín S.A.S. - Inventario de productos" , data.settings.margin.left, 22);
        //Fin Header
        // Footer
        var str = 'Página ' + doc.getNumberOfPages() 
        if (typeof doc.putTotalPages === 'function') { 
          str = str + ' de ' + totalPagesExp 
        }
        var pageSize = doc.internal.pageSize 
        var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight() 
        doc.setFontSize(5);
        doc.text(str, data.settings.margin.left, pageHeight - 10) 
        //Fin Footer
      },
    });
    //Número de páginas
    if (typeof doc.putTotalPages === 'function') { 
      doc.putTotalPages(totalPagesExp) 
    } 
    //Fin numero de páginas
    doc.save(`${new Date().toISOString().substring(0, 10)}_Inventario.pdf`)
  }
}
