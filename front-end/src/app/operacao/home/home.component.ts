import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '../../service/http-client.service'

interface Mensagem {
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

  mensagensClimb: Mensagem[];
  mensagensRoute: Mensagem[];
  mensagensEmergency: Mensagem[];
  mensagensDescend: Mensagem[];
  mensagensComms: Mensagem[];
  mensagensSpeed: Mensagem[];
  mensagensReport: Mensagem[];
  mensagensCrossing: Mensagem[];

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

  climb() {
    this.httpClientService.getMensagem('climb').subscribe(
      response => {
        this.mensagensClimb = response
        this.displayClimb = true;
      }

    );
  }

  route() {
    this.httpClientService.getMensagem('route').subscribe(
      response => {
        this.mensagensRoute = response
        this.displayRoute = true;
      }
    );
  }

  emergency() {
    this.httpClientService.getMensagem('emergency').subscribe(
      response => {
        this.mensagensEmergency=response
        this.displayEmergency = true;
      }
    );
  }

  descend() {
    this.httpClientService.getMensagem('descend').subscribe(
      response => {
        this.mensagensDescend = response
        this.displayDescend = true;
      }
    );
  }

  comms() {
    this.httpClientService.getMensagem('comms').subscribe(
      response => {
        this.mensagensComms = response
        this.displayComms = true;
      }
    );
  }

  speed() {
    this.httpClientService.getMensagem('speed').subscribe(
      response => {
        this.mensagensSpeed = response
        this.displaySpeed = true;
      }
    );
  }

  report() {
    this.httpClientService.getMensagem('report').subscribe(
      response => {
        this.mensagensReport = response
        this.displayReport = true;
      }
    );
  }

  crossing() {
    this.httpClientService.getMensagem('crossing').subscribe(
      response => {
        this.mensagensCrossing = response
        this.displayCrossing = true;
      }
    );
  }

}
