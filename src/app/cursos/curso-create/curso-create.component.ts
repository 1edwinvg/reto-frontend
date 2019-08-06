import { Component, OnInit } from '@angular/core';

import {
  FormControl,
  FormGroup,
  Validators,
  AbstractControl
} from '@angular/forms';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material';
import { SuccessDialogComponent } from '../../shared/dialog/success-dialog/success-dialog.component';
import { ErrorHandlerService } from '../../shared/ErrorHandlerService';
import { AddCurso } from '../../interface/AddCurso.model';
import { RepositoryService } from 'src/app/shared/Repository.Service';
import { Catalogo } from 'src/app/interface/catalago.model';
import { Observable } from 'rxjs';
import { MessageService } from 'src/app/shared/MessageService';

@Component({
  selector: 'app-curso-create',
  templateUrl: './curso-create.component.html',
  styleUrls: ['./curso-create.component.scss']
})
export class CursoCreateComponent implements OnInit {
  public checked: boolean;
  public aviso: string = ' Inactivo';
  public cursoForm: FormGroup;
  private dialogConfig;
  private mensajeError: string;
  private curso: any = [];
  private losCursos: Catalogo[];
  private activarAviso: boolean = false;


  constructor(
    private location: Location,
    private repository: RepositoryService,
    private dialog: MatDialog,
    private errorService: ErrorHandlerService,
    private messageService: MessageService
  ) {}

  ngOnInit() {

    this.getAllCurso();


    this.cursoForm = new FormGroup({
      profesor: new FormControl('', [Validators.required]),
      titulo: new FormControl('', [
        Validators.required,
        Validators.maxLength(100)
      ]),
      horas: new FormControl('', [Validators.required]),
      dolencia: new FormControl('', [
        Validators.required,
        Validators.maxLength(60)
      ]),
      nivel: new FormControl('', [Validators.required])
    });
    this.checked = false;

    this.dialogConfig = {
      height: '200px',
      width: '400px',
      disableClose: true,
      data: {}
    };

  }
  onChange(event) {
    this.checked = !this.checked;
    if (this.checked) {
      this.aviso = 'El curso esta activo';
    } else {
      this.aviso = 'Inactivo';
    }
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.cursoForm.controls[controlName].hasError(errorName);
  };

  public onCancel = () => {
    this.location.back();
  };

  public createCurso = cursoFormValue => {
    if (this.cursoForm.valid) {
      this.executeCursoCreation(cursoFormValue);
      console.log(cursoFormValue);
    }
  };

  /* le pasamos el value de los inputs*/
  private executeCursoCreation = cursoFormValue => {
    let activo = this.checked;

    let curso: AddCurso = {
      activo,
      profesor: cursoFormValue.profesor,
      titulo: cursoFormValue.titulo,
      horas: cursoFormValue.horas,
      nivel: cursoFormValue.nivel
    };

    // DEFINE URL PARA LA PETICION AL BACKEND
    let apiUrl = 'courses'; // por definir
    this.repository.create(apiUrl, curso).subscribe(
      res => {
        let dialogRef = this.dialog.open(
          SuccessDialogComponent,
          this.dialogConfig
        );

        //we are subscribing on the [mat-dialog-close] attribute as soon as we click on the dialog button
        dialogRef.afterClosed().subscribe(result => {
          this.location.back();
        });
      },
      error => {
        this.errorService.dialogConfig = { ...this.dialogConfig };
        this.errorService.handleError(error);
        if (error.includes('ConstraintViolationException')) {
          this.activarAviso = true;
          this.mensajeError = 'el usuario ya existe';
        }
      }
    );
  }


    // this.curso.array.forEach(element => {
    //   element.push(this.losCursos);
    // });


  public  getAllCurso = () => {
    this.repository.getData('courses/all').subscribe(
      res => {
        this.losCursos = res as Catalogo[] ;
        console.log(this.losCursos);
      },
      error => {
        this.errorService.handleError(error);
      }
    );

  }
}
