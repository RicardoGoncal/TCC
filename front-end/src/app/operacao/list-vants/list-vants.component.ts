import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClientService } from 'src/app/service/http-client.service';

@Component({
  selector: 'app-list-vants',
  templateUrl: './list-vants.component.html',
  styleUrls: ['./list-vants.component.css']
})


export class ListVantsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nome', 'port', 'acao'];

  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(
    private httpClientService: HttpClientService
  ) { }


  ngOnInit() {
    this.httpClientService.getVants().subscribe(
      res => {
        this.dataSource = new MatTableDataSource();
        this.dataSource.data =  res;
        this.dataSource.paginator = this.paginator;     
      }, err => {
        console.log(err)
      })
  }
}
