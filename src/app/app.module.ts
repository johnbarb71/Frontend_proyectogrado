import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {NgxPaginationModule} from 'ngx-pagination';
/* Modal popup */
import {MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { RegistroComponent } from './components/registro/registro.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { HomeComponent } from './components/home/home.component';
import { NavComponent } from './components/share/nav/nav.component';
import { SidebarComponent } from './components/share/sidebar/sidebar.component';
import { ContactoComponent } from './components/share/contacto/contacto.component';
import { AyudaComponent } from './components/share/ayuda/ayuda.component';
import { ActivarusuarioComponent } from './components/usuarios/activarusuario/activarusuario.component';
import { EditarusuarioComponent } from './components/usuarios/editarusuario/editarusuario.component';
import { AgregarusuarioComponent } from './components/usuarios/agregarusuario/agregarusuario.component';
import { UsuarioComponent } from './components/usuarios/usuario/usuario.component';
import { EditarusuariosComponent } from './components/usuarios/editarusuarios/editarusuarios.component';
import { ActivarusuariosComponent } from './components/usuarios/activarusuarios/activarusuarios.component';
import { ProveedoresComponent } from './components/proveedores/proveedores/proveedores.component';
import { EditarproveedoresComponent } from './components/proveedores/editarproveedores/editarproveedores.component';
import { EditarproveedorComponent } from './components/proveedores/editarproveedor/editarproveedor.component';
import { AgregarproveedorComponent } from './components/proveedores/agregarproveedor/agregarproveedor.component';
import { ProductosComponent } from './components/productos/productos/productos.component';
import { AgregarproductoComponent } from './components/productos/agregarproducto/agregarproducto.component';
import { EditarproductoComponent } from './components/productos/editarproducto/editarproducto.component';
import { EditarproductosComponent } from './components/productos/editarproductos/editarproductos.component';
import { AgregarproductosComponent } from './components/productos/agregarproductos/agregarproductos.component';
import { ConsultarproductosComponent } from './components/productos/consultarproductos/consultarproductos.component';
import { RolComponent } from './components/role/rol/rol.component';
import { AgregarrolComponent } from './components/role/agregarrol/agregarrol.component';
import { EditarrolesComponent } from './components/role/editarroles/editarroles.component';
import { EditarrolComponent } from './components/role/editarrol/editarrol.component';
import { ConsultarproductoComponent } from './components/productos/consultarproducto/consultarproducto.component';
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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InicioComponent,
    RegistroComponent,
    HomeComponent,
    NavComponent,
    SidebarComponent,
    ContactoComponent,
    AyudaComponent,
    ActivarusuarioComponent,
    EditarusuarioComponent,
    AgregarusuarioComponent,
    UsuarioComponent,
    EditarusuariosComponent,
    ActivarusuariosComponent,
    ProveedoresComponent,
    EditarproveedoresComponent,
    EditarproveedorComponent,
    AgregarproveedorComponent,
    ProductosComponent,
    AgregarproductoComponent,
    EditarproductoComponent,
    EditarproductosComponent,
    AgregarproductosComponent,
    ConsultarproductosComponent,
    RolComponent,
    AgregarrolComponent,
    EditarrolesComponent,
    EditarrolComponent,
    ConsultarproductoComponent,
    SucursalesComponent,
    EditarsucursalesComponent,
    EditarsucursalComponent,
    AgregarsucursalComponent,
    InventarioComponent,
    AgregarinventarioComponent,
    PopupsucurComponent,
    SucursalComponent,
    InformeComponent,
    InformeSucursalComponent,
    InformeSucursalLineaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    MatDialogModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
