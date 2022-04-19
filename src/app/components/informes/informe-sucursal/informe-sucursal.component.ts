import { Component, OnInit } from '@angular/core';
import { ProductoModel } from 'src/app/models/producto.model';
import { AuthService } from 'src/app/services/auth.service';
import { ProductosService } from 'src/app/services/productos.service';
import { SucursalService } from 'src/app/services/sucursal.service';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Router } from '@angular/router';

@Component({
  selector: 'app-informe-sucursal',
  templateUrl: './informe-sucursal.component.html',
  styleUrls: ['./informe-sucursal.component.css']
})
export class InformeSucursalComponent implements OnInit {

  sucAct: string;
  //productos: []=[];
  DataArray: any = [];
  public pagina: number = 1;
  public itemxpagina: number = 50;
  public total: number;
  cargando = false;

  constructor(private router:Router,private produc:ProductosService, private sucur:SucursalService, private auth:AuthService) {
    
   }

  ngOnInit(): void {
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

  headRows() {
    return [{codigo: 'Código', nombre: 'Nombre', resultado: 'Resultado', cantidad: 'Cantidad', total: 'Total'}];
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
        doc.text("Despensa San Agustín S.A.S. - Inventario de productos", data.settings.margin.left, 22);
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

  //Borrar gondola,bodega,resultado,cantidad de la tabla Inventarios
  eliminarCantidades(id_sucursal:string){
    Swal.fire({
      title: '¿Está seguro de borrar el conteo? Se borrarán los datos permanentemente',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Borrar',
      denyButtonText: `No borrar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.produc.putCerosCantidades(id_sucursal).subscribe((resp:any)=>{
          console.log('%cinforme-sucursal.component.ts line:125 resp', 'color: #007acc;', resp);
        })
        this.router.navigateByUrl('home/informes');
        Swal.fire('¡Borrado!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('No hay cambios', '', 'info')
      }
    })
  }

}
