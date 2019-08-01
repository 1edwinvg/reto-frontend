import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { CursoRoutingModule } from './curso-routing.module';
import { CursoCreateComponent } from './curso-create/curso-create.component';
import { CursoUpdateComponent } from './curso-update/curso-update.component';
import { CursoDeleteComponent } from './curso-delete/curso-delete.component';
import { CursoListComponent } from './curso-list/curso-list.component';
import { CursoDetailsComponent } from './curso-details/curso-details.component';

@NgModule({
  imports: [
    CommonModule,
    CursoRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [

    CursoListComponent,
    CursoDeleteComponent,
    CursoUpdateComponent,
    CursoCreateComponent,
    CursoDetailsComponent

  ]
})
export class ComponenteCursoModule {}

