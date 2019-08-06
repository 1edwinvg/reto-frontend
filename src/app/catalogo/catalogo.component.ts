import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Catalogo } from '../interface/catalago.model';
import { Router } from '@angular/router';

import { ErrorHandlerService } from '../shared/ErrorHandlerService';
import { RepositoryService } from '../shared/Repository.Service';


@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss']
})
export class CatalogoComponent<T> implements OnInit {
  public displayedColumns = [
    'Profesor',
    'Titulo',
    'Nivel',
    'Horas',
    'PDF'
  ];
  public operators = new MatTableDataSource<Catalogo>();

  @ViewChild(MatSort, { static: true }) ordenar: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private repoService: RepositoryService,
    private errorService: ErrorHandlerService,
    private router: Router
  ) {}

  ngOnInit() {
    // this.operators.sort = this.sort;
    this.getAllCurso();
  }

  ngAfterViewInit(): void {

 this.operators.sort = this.ordenar;
    this.operators.paginator = this.paginator;
  }

  public getAllCurso = () => {
    this.repoService.getData('courses/all').subscribe(
      res => {
        this.operators.data = res as Catalogo[];
        console.log( this.operators.data);
      },
      error => {
        this.errorService.handleError(error);
      }
    );
  }

  public doFilter = (value: string) => {
    this.operators.filter = value.trim().toLocaleLowerCase();
  }

  public btnPdf = (id: string) => {
    // let url: string = `/clientes/details/${id}`;
    // console.log(url);
    // this.router.navigate([url]);
  }
}
