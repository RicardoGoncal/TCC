import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '../../service/http-client.service'

interface Mensagem {
  id: string;
  mensagem: string;
}

interface SendMessage {
  [key: string]: any
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

  selectedClimb: string;
  selectedRoute: string;
  selectedEmergency: string;
  selectedDescend: string;
  selectedComms: string;
  selectedSpeed: string;
  selectedReport: string;
  selectedCrossing: string;

  numberClimb: string;
  numberRoute: string;
  numberDescend: string;
  numberSpeed: string;
  numberCrossing: string;

  messageToVant: SendMessage = {};


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

  excluir(f: string) {
    if (f == 'displayClimb') { this.displayClimb = false, this.selectedClimb = ''; }
    if (f == 'displayRoute') { this.displayRoute = false, this.selectedRoute = ''; }
    if (f == 'displayEmergency') { this.displayEmergency = false, this.selectedEmergency = ''; }
    if (f == 'displayDescend') { this.displayDescend = false, this.selectedDescend = ''; }
    if (f == 'displayComms') { this.displayComms = false, this.selectedComms = ''; }
    if (f == 'displaySpeed') { this.displaySpeed = false, this.selectedSpeed = ''; }
    if (f == 'displayReport') { this.displayReport = false, this.selectedReport = ''; }
    if (f == 'displayCrossing') { this.displayCrossing = false, this.selectedCrossing = ''; }

    this.maxMensagem--;
  }

  reset(){
    this.messageToVant = {};
    
    this.displayClimb = false, this.mensagensClimb = []; 
    this.displayRoute = false, this.mensagensRoute = []; 
    this.displayEmergency = false, this.mensagensEmergency = []; 
    this.displayDescend = false, this.mensagensDescend = []; 
    this.displayComms = false, this.mensagensComms = []; 
    this.displaySpeed = false, this.mensagensSpeed = []; 
    this.displayReport = false, this.mensagensReport = []; 
    this.displayCrossing = false, this.mensagensCrossing = []; 

    this.maxMensagem = 1;
  }

  climb() {
    console.log(this.mensagensClimb)
    this.httpClientService.getMensagem('climb').subscribe(
      response => {
        if (this.maxMensagem < 6 && this.displayClimb == false) {
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
        if (this.maxMensagem < 6 && this.displayRoute == false) {
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
        if (this.maxMensagem < 6 && this.displayEmergency == false) {
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
        if (this.maxMensagem < 6 && this.displayDescend == false) {
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
        if (this.maxMensagem < 6 && this.displayComms == false) {
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
        if (this.maxMensagem < 6 && this.displaySpeed == false) {
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
        if (this.maxMensagem < 6 && this.displayReport == false) {
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
        if (this.maxMensagem < 6 && this.displayCrossing == false) {
          this.mensagensCrossing = response
          this.displayCrossing = true;
          this.maxMensagem++;
        }
      }
    );
  }

  sendMessage() {


    if (this.selectedClimb != undefined) {
      this.messageToVant.climb += this.selectedClimb + ' ' + this.numberClimb;
    }
    if (this.selectedRoute != undefined) {
      this.messageToVant.route += this.selectedRoute + ' ' + this.numberRoute;
    }
    if (this.selectedEmergency != undefined) {
      this.messageToVant.emergency += this.selectedEmergency;
    }
    if (this.selectedDescend != undefined) {
      this.messageToVant.descend += this.selectedDescend + ' ' + this.numberDescend;
    }
    if (this.selectedComms != undefined) {
      this.messageToVant.comms += this.selectedComms;
    }
    if (this.selectedSpeed != undefined) {
      this.messageToVant.speed += this.selectedSpeed + ' ' + this.numberSpeed;
    }
    if (this.selectedReport != undefined) {
      this.messageToVant.report += this.selectedReport;
    }
    if (this.selectedCrossing != undefined) {
      this.messageToVant.crossing += this.selectedCrossing + ' ' + this.numberCrossing;
    }

    this.httpClientService.sendMessage(this.messageToVant).subscribe(
      response => {
        console.log("Resposta do python")
        console.log(response)
      }
    );

    this.reset()

  }

}
