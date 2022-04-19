import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleModel } from './models/role.model';
/* Modulos app */
import { LoginComponent } from './components/login/login.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { RegistroComponent } from './components/registro/registro.component';
import { HomeComponent } from "./components/home/home.component";
import { ContactoComponent } from "./components/share/contacto/contacto.component";
import { AyudaComponent } from "./components/share/ayuda/ayuda.component";
import { ShareInicioComponent } from "./components/share/inicio/inicio.component";
import { AuthGuard } from './guards/auth.guard';
import { ActivarusuarioComponent } from "./components/usuarios/activarusuario/activarusuario.component";
import { AgregarusuarioComponent } from "./components/usuarios/agregarusuario/agregarusuario.component";
import { EditarusuarioComponent } from "./components/usuarios/editarusuario/editarusuario.component";
import { SucusuariosComponent } from "./components/usuarios/sucusuarios/sucusuarios.component";
import { SucusuarioComponent } from "./components/usuarios/sucusuario/sucusuario.component";
import { UsuarioComponent } from "./components/usuarios/usuario/usuario.component";
import { ActivarusuariosComponent } from "./components/usuarios/activarusuarios/activarusuarios.component";
import { EditarusuariosComponent } from "./components/usuarios/editarusuarios/editarusuarios.component";
import { ProveedoresComponent } from "./components/proveedores/proveedores/proveedores.component";
import { EditarproveedoresComponent } from "./components/proveedores/editarproveedores/editarproveedores.component";
import { EditarproveedorComponent } from "./components/proveedores/editarproveedor/editarproveedor.component";
import { AgregarproveedorComponent } from './components/proveedores/agregarproveedor/agregarproveedor.component';
import { ProductosComponent } from './components/productos/productos/productos.component';
import { AgregarproductosComponent } from './components/productos/agregarproductos/agregarproductos.component';
import { AgregarproductoComponent } from './components/productos/agregarproducto/agregarproducto.component';
import { EditarproductosComponent } from './components/productos/editarproductos/editarproductos.component';
import { EditarproductoComponent } from './components/productos/editarproducto/editarproducto.component';
import { ConsultarproductosComponent } from './components/productos/consultarproductos/consultarproductos.component';
import { ConsultarproductoComponent } from './components/productos/consultarproducto/consultarproducto.component';
import { RolComponent } from './components/role/rol/rol.component';
import { EditarrolesComponent } from './components/role/editarroles/editarroles.component';
import { EditarrolComponent } from './components/role/editarrol/editarrol.component';
import { AgregarrolComponent } from './components/role/agregarrol/agregarrol.component';
import { SucursalesComponent } from './components/sucursales/sucursales/sucursales.component';
import { EditarsucursalesComponent } from './components/sucursales/editarsucursales/editarsucursales.component';
import { EditarsucursalComponent } from './components/sucursales/editarsucursal/editarsucursal.component';
import { AgregarsucursalComponent } from './components/sucursales/agregarsucursal/agregarsucursal.component';
import { InventarioComponent } from './components/inventarios/inventario/inventario.component';
import { AgregarinventarioComponent } from './components/inventarios/agregarinventario/agregarinventario.component';
import { PopupsucurComponent } from './components/share/popupsucur/popupsucur.component';
import { SucursalComponent } from './components/share/sucursal/sucursal.component';
import { InformeComponent } from './components/informes/informe/informe.component';
import { InformeSucursalComponent } from './components/informes/informe-sucursal/informe-sucursal.component';
import { InformeSucursalLineaComponent } from './components/informes/informe-sucursal-linea/informe-sucursal-linea.component';

const routes: Routes = [
  {path: 'inicio', component: InicioComponent},
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'sucursal', component: SucursalComponent, canActivate:[ AuthGuard] },
  { path: 'home', component: HomeComponent, canActivate:[ AuthGuard],
    children: [
      
      { path: '', pathMatch: 'full', redirectTo: 'inicio' },
      { path: 'inicio', component: ShareInicioComponent, canActivate:[ AuthGuard] },
      { path: 'contacto', component: ContactoComponent, canActivate:[ AuthGuard] },
      { path: 'ayuda', component: AyudaComponent, canActivate:[ AuthGuard] },
      /* Usuario */
      { path: 'usuario', component: UsuarioComponent, canActivate:[ AuthGuard]},
      { path: 'usuario/users/activar/:id', component: ActivarusuarioComponent, canActivate:[ AuthGuard] },
      { path: 'usuario/users/activar', component: ActivarusuariosComponent, canActivate:[ AuthGuard] },
      { path: 'usuario/users/editar/:id', component: EditarusuarioComponent, canActivate:[ AuthGuard] },
      { path: 'usuario/users/editar', component: EditarusuariosComponent, canActivate:[ AuthGuard] },
      { path: 'usuario/agregar', component: AgregarusuarioComponent, canActivate:[ AuthGuard] },
      { path: 'usuario/sucursal', component: SucusuariosComponent, canActivate:[ AuthGuard] },
      { path: 'usuario/sucursal/:id', component: SucusuarioComponent, canActivate:[ AuthGuard] },
      /* Proveedores */
      { path: 'proveedor', component: ProveedoresComponent, canActivate:[ AuthGuard] },
      { path: 'proveedor/editar', component: EditarproveedoresComponent, canActivate:[ AuthGuard] },
      { path: 'proveedor/editar/:id', component: EditarproveedorComponent, canActivate:[ AuthGuard] },
      { path: 'proveedor/agregar', component: AgregarproveedorComponent, canActivate:[ AuthGuard] },
      /* Productos */
      { path: 'productos', component: ProductosComponent, canActivate:[ AuthGuard] },
      { path: 'productos/editar', component: EditarproductosComponent, canActivate:[ AuthGuard] },
      { path: 'productos/editar/:id', component: EditarproductoComponent, canActivate:[ AuthGuard] },
      { path: 'productos/agregar', component: AgregarproductosComponent, canActivate:[ AuthGuard]},
      { path: 'productos/consultar', component: ConsultarproductosComponent, canActivate:[ AuthGuard]},
      { path: 'productos/consultar/:id', component: ConsultarproductoComponent, canActivate:[ AuthGuard]},
      /* Roles */
      { path: 'roles', component: RolComponent, canActivate:[ AuthGuard] },
      { path: 'roles/editar/:id', component: EditarrolComponent, canActivate:[ AuthGuard] },
      { path: 'roles/editar', component: EditarrolesComponent, canActivate:[ AuthGuard] },
      { path: 'roles/agregar', component: AgregarrolComponent, canActivate:[ AuthGuard]},
      /* Sucursales */
      { path: 'sucursales', component: SucursalesComponent, canActivate:[ AuthGuard] },
      { path: 'sucursales/editar/:id', component: EditarsucursalComponent, canActivate:[ AuthGuard] },
      { path: 'sucursales/editar', component: EditarsucursalesComponent, canActivate:[ AuthGuard] },
      { path: 'sucursales/agregar', component: AgregarsucursalComponent, canActivate:[ AuthGuard]},
      /* Inventarios */
      { path: 'inventarios', component: InventarioComponent, canActivate:[ AuthGuard] },
      { path: 'inventarios/agregar', component: AgregarinventarioComponent, canActivate:[ AuthGuard]},
      /* Inventarios */
      { path: 'informes', component: InformeComponent, canActivate:[ AuthGuard] },
      { path: 'informes/informe', component: InformeSucursalComponent, canActivate:[ AuthGuard]},
      /* { path: 'informes/informe/:sucursal', component: InformeSucursalComponent, canActivate:[ AuthGuard]}, */
      { path: 'informes/informe/linea', component: InformeSucursalLineaComponent, canActivate:[ AuthGuard]},
      /* { path: 'informes/informe/linea/:sucursal/:linea', component: InformeSucursalLineaComponent, canActivate:[ AuthGuard]}, */
    ] },
  
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
