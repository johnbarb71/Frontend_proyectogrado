import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoleModel } from 'src/app/models/role.model';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-editarroles',
  templateUrl: './editarroles.component.html',
  styleUrls: ['./editarroles.component.css']
})
export class EditarrolesComponent implements OnInit {

  roles:RoleModel []=[];

  constructor(private rol:RoleService,private router:Router) { }

  ngOnInit(): void {
    this.rol.getRoles().subscribe((resp:any)=>{
      this.roles = resp;
    })
  }
  // Método para buscar el ID del rol y redireccionar
  buscarId(termino:string){
    this.router.navigate(['/home/roles/editar',termino]);
  };

}
