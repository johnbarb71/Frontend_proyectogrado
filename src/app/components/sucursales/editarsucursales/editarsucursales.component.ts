import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SucursalModel } from 'src/app/models/sucursal.model';
import { SucursalService } from 'src/app/services/sucursal.service';


@Component({
  selector: 'app-editarsucursales',
  templateUrl: './editarsucursales.component.html',
  styleUrls: ['./editarsucursales.component.css']
})
export class EditarsucursalesComponent implements OnInit {

  sucursales:SucursalModel []=[];

  constructor(private sucurs:SucursalService,private router:Router) { }

  ngOnInit(): void {
    this.sucurs.getSucursales().subscribe((resp:any)=>{
      this.sucursales = resp;
    })
  }
  // Método para buscar el ID de sucursal y redireccionar
  buscarId(termino:string){
    this.router.navigate(['/home/sucursales/editar',termino]);
  };

  regresarPagina(){
    return this.router.navigateByUrl('/home/sucursales');
  }

}
