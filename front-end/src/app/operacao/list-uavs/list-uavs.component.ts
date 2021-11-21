import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SendMessage } from 'src/app/models/SendMessage';
import { HttpClientService } from 'src/app/service/http-client.service';
@Component({
  selector: 'app-list-uavs',
  templateUrl: './list-uavs.component.html',
  styleUrls: ['./list-uavs.component.css']
})

export class ListUavsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nome', 'port', 'acao', 'conectar'];

  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  messageToUav: SendMessage = {};
  
  constructor(
    private httpClientService: HttpClientService
  ) { }


  ngOnInit() {
    this.httpClientService.getUavs().subscribe(
      res => {
        this.dataSource = new MatTableDataSource();
        this.dataSource.data =  res;
        this.dataSource.paginator = this.paginator;     
      }, err => {
        console.log(err)
      })
  }

  start(port: string){
    this.messageToUav.message = '' 
    this.messageToUav.port = port
    this.httpClientService.startUav(this.messageToUav).subscribe(
      res => {
           
      }, err => {
        console.log(err)
      })
  }
}
