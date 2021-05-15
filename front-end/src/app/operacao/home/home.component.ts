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
  displayRoute: boolean = false;
  displayEmergency: boolean = false;
  displayDescend: boolean = false;
  displayComms: boolean = false;
  displaySpeed: boolean = false;
  displayReport: boolean = false;
  displayCrossing: boolean = false;

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

  handleSuccessfulResponseMsg(response) {
    this.mensagens = response
  }

  climb(){
    this.httpClientService.getMensagem('climb').subscribe(
      response => { this.handleSuccessfulResponseMsg(response) 
        this.displayClimb = true;}
      
    );
  }

  route(){
    this.httpClientService.getMensagem('route').subscribe(
      response => { this.handleSuccessfulResponseMsg(response) 
        this.displayRoute = true;}
    );
  }

  emergency(){
    this.httpClientService.getMensagem('emergency').subscribe(
      response => { this.handleSuccessfulResponseMsg(response) 
        this.displayEmergency = true;}
    );
  }

  descend(){
    this.httpClientService.getMensagem('descend').subscribe(
      response => { this.handleSuccessfulResponseMsg(response) 
        this.displayDescend = true;}
    );
  }

  comms(){
    this.httpClientService.getMensagem('comms').subscribe(
      response => { this.handleSuccessfulResponseMsg(response) 
        this.displayComms = true;}
    );
  }

  speed(){
    this.httpClientService.getMensagem('speed').subscribe(
      response => { this.handleSuccessfulResponseMsg(response) 
        this.displaySpeed = true;}
    );
  }

  report(){
    this.httpClientService.getMensagem('report').subscribe(
      response => { this.handleSuccessfulResponseMsg(response) 
        this.displayReport = true;}
    );
  }

  crossing(){
    this.httpClientService.getMensagem('crossing').subscribe(
      response => { this.handleSuccessfulResponseMsg(response) 
        this.displayCrossing = true;}
    );
  }

}
