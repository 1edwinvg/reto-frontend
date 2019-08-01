import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CursoListComponent } from './curso-list/curso-list.component';
import { CursoCreateComponent } from './curso-create/curso-create.component';
import { CursoUpdateComponent } from './curso-update/curso-update.component';
import { CursoDeleteComponent } from './curso-delete/curso-delete.component';
import { CursoDetailsComponent } from './curso-details/curso-details.component';

const routes: Routes = [
  { path: 'lista', component: CursoListComponent },
  { path: 'details/:id', component: CursoDetailsComponent },
  { path: 'create', component: CursoCreateComponent },
  { path: 'update/:id', component: CursoUpdateComponent },
  { path: 'delete/:id', component: CursoDeleteComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class CursoRoutingModule { }
