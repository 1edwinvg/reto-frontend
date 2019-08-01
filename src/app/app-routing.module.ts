import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CatalogoComponent } from './catalogo/catalogo.component';




const routes: Routes = [
  { path: 'catalogo', component: CatalogoComponent },
  { path: 'curso', loadChildren: "./cursos/componente.curso.module#ComponenteCursoModule" },
   { path: '', redirectTo: '/catalogo', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
