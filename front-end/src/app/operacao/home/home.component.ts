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

  maxMensagem = 1;

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
        if (this.maxMensagem < 6) {
          this.mensagensClimb = response
          this.displayClimb = true;
          this.maxMensagem++;
        }
      }

    );
  }

  route() {
    this.httpClientService.getMensagem('route').subscribe(
      response => {
        if (this.maxMensagem < 6) {
          this.mensagensRoute = response
          this.displayRoute = true;
          this.maxMensagem++;
        }
      }
    );
  }

  emergency() {
    this.httpClientService.getMensagem('emergency').subscribe(
      response => {
        if (this.maxMensagem < 6) {
          this.mensagensEmergency = response
          this.displayEmergency = true;
          this.maxMensagem++;
        }
      }
    );
  }

  descend() {
    this.httpClientService.getMensagem('descend').subscribe(
      response => {
        if (this.maxMensagem < 6) {
          this.mensagensDescend = response
          this.displayDescend = true;
          this.maxMensagem++;
        }
      }
    );
  }

  comms() {
    this.httpClientService.getMensagem('comms').subscribe(
      response => {
        if (this.maxMensagem < 6) {
          this.mensagensComms = response
          this.displayComms = true;
          this.maxMensagem++;
        }
      }
    );
  }

  speed() {
    this.httpClientService.getMensagem('speed').subscribe(
      response => {
        if (this.maxMensagem < 6) {
          this.mensagensSpeed = response
          this.displaySpeed = true;
          this.maxMensagem++;
        }
      }
    );
  }

  report() {
    this.httpClientService.getMensagem('report').subscribe(
      response => {
        if (this.maxMensagem < 6) {
          this.mensagensReport = response
          this.displayReport = true;
          this.maxMensagem++;
        }
      }
    );
  }

  crossing() {
    this.httpClientService.getMensagem('crossing').subscribe(
      response => {
        if (this.maxMensagem < 6) {
          this.mensagensCrossing = response
          this.displayCrossing = true;
          this.maxMensagem++;
        }
      }
    );
  }

}
