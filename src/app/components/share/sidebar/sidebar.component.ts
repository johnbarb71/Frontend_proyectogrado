import { Component, OnInit, SimpleChanges  } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioModel } from '../../../models/usuario.model';
import {Observable} from 'rxjs';
import { RouterLinkActive } from '@angular/router';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  clientes$: Observable<UsuarioModel>;
  cliente : UsuarioModel;  

  constructor(private auth:AuthService, public router: Router, public location: Location) {  
    this.cliente = auth.leerUsuario();
    /* console.log('%csidebar.component.ts line:18 this.cliente', 'color: #007acc;', this.cliente); */
  }

  

  ngOnInit(): void {
  }

  refresh(): void {
		this.router.navigateByUrl("/home", { skipLocationChange: true }).then(() => {
		console.log(decodeURI(this.location.path()));
		this.router.navigate([decodeURI(this.location.path())]);
		});
	}
  
}
