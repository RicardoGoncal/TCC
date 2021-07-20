import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ClimaService } from 'src/app/service/clima.service';

@Component({
  selector: 'app-clima',
  templateUrl: './clima.component.html',
  styleUrls: ['./clima.component.css']
})
export class ClimaComponent implements OnInit {

  displayedColumns: string[] = ['CAPITAL', 'TMIN18', 'TMAX18', 'UMIN18', 'PMAX12'];

  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(
    private climaService: ClimaService
  ) { }


  ngOnInit() {
    this.climaService.getClima().subscribe(
      res => {
        this.dataSource = new MatTableDataSource();
        this.dataSource.data =  res;
        this.dataSource.paginator = this.paginator;     
        console.log(this.dataSource)
      }, err => {
        console.log(err)
      })
  }

}
