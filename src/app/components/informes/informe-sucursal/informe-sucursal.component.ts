import { Component, OnInit } from '@angular/core';
import { ProductoModel } from 'src/app/models/producto.model';
import { AuthService } from 'src/app/services/auth.service';
import { ProductosService } from 'src/app/services/productos.service';
import { SucursalService } from 'src/app/services/sucursal.service';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
//import html2canvas from 'html2canvas';
import autoTable from 'jspdf-autotable';

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

  constructor(private produc:ProductosService, private sucur:SucursalService, private auth:AuthService) {
    this.cargando = true;
    this.loading();
    this.sucAct = auth.leerSucuAct();
    this.produc.getInformesucursal(this.sucAct).subscribe(
      data => {
        this.DataArray = data as string[];
      },
      (error) => console.log(error)
    );
    this.cargando = false;  
    
   }

  ngOnInit(): void {
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
    //
    
    //
    doc.setFontSize(9);
    doc.setTextColor(100);
    autoTable(doc, {
      head: this.headRows(),
      body: this.bodyRows(),
      theme: 'grid',
      margin: { top: 25, bottom:10 },
      styles: { overflow: 'linebreak',fontSize: 6},
      showHead: "everyPage",
      didDrawPage: function (data) {
        // Header
        doc.setFontSize(10);
        doc.setTextColor(40);
        doc.text("Despensa San Agustín S.A.S. - Inventario de productos", data.settings.margin.left, 22);
        // FOOTER
        // Footer
        var str = "Page " + doc.internal.pages[2];
      }  
    });
    //Numero de paginas
    
    //Fin numero de paginas
    doc.save(`${new Date().toISOString().substring(0, 10)}_Inventario.pdf`)
  }

}
