import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '../../service/http-client.service'

interface Mensagem{
  id: string;
  mensagem: string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  categorias: string[];

  mensagens: Mensagem[];

  displayClimb: boolean = false;

  constructor(
    private httpClientService: HttpClientService
  ) { }


  ngOnInit() {
    this.httpClientService.getCategorias().subscribe(
      response => this.handleSuccessfulResponse(response),
    );
  }

  handleSuccessfulResponse(response) {
    this.categorias = response;
  }

  handleSuccessfulResponseClimb(response) {
    this.mensagens = response
    this.displayClimb = true;
  }

  climb(){
    this.httpClientService.getMensagem().subscribe(
      response => this.handleSuccessfulResponseClimb(response)
    );
  }
}
