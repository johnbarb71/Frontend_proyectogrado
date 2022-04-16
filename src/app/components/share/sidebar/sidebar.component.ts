import { Component, OnInit, SimpleChanges  } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioModel } from '../../../models/usuario.model';
import {Observable} from 'rxjs';
import { RouterLinkActive } from '@angular/router';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { SucursalModel } from 'src/app/models/sucursal.model';
import { SucursalService } from 'src/app/services/sucursal.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  clientes$: Observable<UsuarioModel>;
  cliente : UsuarioModel;
  sucursal : SucursalModel;
  sucAct: string = '';
  sucursalNum$: Observable<SucursalModel>;

  constructor(private auth:AuthService, public router: Router, public location: Location, private sucurs:SucursalService) {  
    this.cliente = auth.leerUsuario();
    this.getSucursalActualID();
  }

  

  ngOnInit(): void {

  }

  refresh(): void {
		this.router.navigateByUrl("/home", { skipLocationChange: true }).then(() => {
		console.log(decodeURI(this.location.path()));
		this.router.navigate([decodeURI(this.location.path())]);
		});
	}

  /* lee el token del storage y lo convierte en objeto observable */
  getSucursalActualID(){
    this.sucurs.leerSucuAct();
    this.sucursalNum$ = this.sucurs.getSucursalNum$();
    this.sucursalNum$.subscribe((resp:any )=> {
      this.sucursal = resp;
    });
  }





  
}
