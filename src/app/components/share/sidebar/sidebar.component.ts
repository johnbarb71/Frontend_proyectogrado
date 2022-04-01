import { Component, OnInit, SimpleChanges  } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioModel } from '../../../models/usuario.model';
import {Observable} from 'rxjs';
import { RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent /* implements OnInit */ {

  clientes$: Observable<UsuarioModel>;
  cliente : UsuarioModel;  

  constructor(private auth:AuthService) {  
    this.cliente = auth.leerUsuario();
    /* console.log('%csidebar.component.ts line:18 this.cliente', 'color: #007acc;', this.cliente); */
  }

  

  /* ngOnInit(): void {
    this.clientes$ = this.auth.getCliente$();
    this.clientes$.subscribe(resp=>{
      this.cliente = resp;
      console.log('%csidebar.component.ts line:26 this.cliente', 'color: #007acc;', this.cliente);
    });
    
    console.log('%csidebar.component.ts line:29 this.cliente', 'color: #007acc;', this.cliente);
  } */

  
}
