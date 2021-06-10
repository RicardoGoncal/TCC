import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '../../service/http-client.service'

interface Mensagem {
  id: string;
  mensagem: string;
  categoria: {
    id:string,
    nome:string
  },
}

interface Categoria {
  id: string;
  nome: string;
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

  vantResponse: any;

  categorias: Categoria[];

  maxMensagem = 1;
  maxMensagemDisplay = 0;

  mensagensClimb: Mensagem[];
  mensagensRoute: Mensagem[];
  mensagensEmergency: Mensagem[];
  mensagensDescend: Mensagem[];
  mensagensComms: Mensagem[];
  mensagensSpeed: Mensagem[];
  mensagensReport: Mensagem[];
  mensagensCrossing: Mensagem[];

  displayClimb: number = 0;
  displayRoute: number = 0;
  displayEmergency: number = 0;
  displayDescend: number = 0;
  displayComms: number = 0;
  displaySpeed: number = 0;
  displayReport: number = 0;
  displayCrossing: number = 0;

  selectedClimb: string = '';
  selectedRoute: string = '';
  selectedEmergency: string = '';
  selectedDescend: string = '';
  selectedComms: string = '';
  selectedSpeed: string = '';
  selectedReport: string = '';
  selectedCrossing: string = '';

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
    this.messageToVant.message = ''
  }

  handleSuccessfulResponse(response) {
    this.categorias = response;
  }

  excluir(displayType: string) {
    if (displayType == 'displayClimb') { this.displayClimb = 0, this.selectedClimb = ''; }
    if (displayType == 'displayRoute') { this.displayRoute = 0, this.selectedRoute = ''; }
    if (displayType == 'displayEmergency') { this.displayEmergency = 0, this.selectedEmergency = ''; }
    if (displayType == 'displayDescend') { this.displayDescend = 0, this.selectedDescend = ''; }
    if (displayType == 'displayComms') { this.displayComms = 0, this.selectedComms = ''; }
    if (displayType == 'displaySpeed') { this.displaySpeed = 0, this.selectedSpeed = ''; }
    if (displayType == 'displayReport') { this.displayReport = 0, this.selectedReport = ''; }
    if (displayType == 'displayCrossing') { this.displayCrossing = 0, this.selectedCrossing = ''; }

    this.maxMensagem--;
    this.maxMensagemDisplay = 0;
  }

  resetForm() {

    this.messageToVant = {};
    this.messageToVant.message = ''

    this.displayClimb = 0, this.selectedClimb = '',
    this.displayRoute = 0, this.selectedRoute = '',
    this.displayEmergency = 0, this.selectedEmergency = '',
    this.displayDescend = 0, this.selectedDescend = '',
    this.displayComms = 0, this.selectedComms = '',
    this.displaySpeed = 0, this.selectedSpeed = '',
    this.displayReport = 0, this.selectedReport = '',
    this.displayCrossing = 0, this.selectedCrossing = '',

    this.maxMensagem = 1;
    this.maxMensagemDisplay = 0;
  }

  getMessages(type: string) {
    console.log(this.displayClimb)
    this.httpClientService.getMensagem(type).subscribe(
      response => {
        if(this.maxMensagem < 6 && this.maxMensagemDisplay < 1){
          if ( type == 'climb' && this.displayClimb == 0) {
            this.mensagensClimb = response
            this.displayClimb = 1;
            this.maxMensagem++;
            this.maxMensagemDisplay = 1;

          } else if (type == 'route' && this.displayRoute == 0) {
            this.mensagensRoute = response
            this.displayRoute = 1;
            this.maxMensagem++;
            this.maxMensagemDisplay = 1;

          } else if (type == 'emergency' && this.displayEmergency == 0) {
            this.mensagensEmergency = response
            this.displayEmergency = 1;
            this.maxMensagem++;
            this.maxMensagemDisplay = 1;
          } else if (type == 'descend' && this.displayDescend == 0) {
            this.mensagensDescend = response
            this.displayDescend = 1;
            this.maxMensagem++;
            this.maxMensagemDisplay = 1;
          } else  if (type == 'comms' && this.displayComms == 0) {
            this.mensagensComms = response
            this.displayComms = 1;
            this.maxMensagem++;
            this.maxMensagemDisplay = 1;
          }  else  if (type == 'speed' && this.displaySpeed == 0) {
            this.mensagensSpeed = response
            this.displaySpeed = 1;
            this.maxMensagem++;
            this.maxMensagemDisplay = 1;
          } else if (type == 'report' && this.displayReport == 0) {
            this.mensagensReport = response
            this.displayReport = 1;
            this.maxMensagem++;
            this.maxMensagemDisplay = 1;
          } else if (type == 'crossing' && this.displayCrossing == 0) {
            this.mensagensCrossing = response
            this.displayCrossing = 1;
            this.maxMensagem++;
            this.maxMensagemDisplay = 1;
          }
        }
      }

    );
  }

  addMessage(type: any){

    this.maxMensagemDisplay = 0

    var doc = document.getElementById(type)  
    console.log(doc?.innerText)

    if(doc != null){
      if(doc.innerText == null || doc.innerText == '' || doc.innerText == undefined){
        console.log('ERRO')
        return
      }

        if (this.numberClimb != undefined && this.numberClimb != '') {
          this.messageToVant.message += doc.innerText != null ? doc.innerText.replace('\t', '') + ':' + this.numberClimb + ';' : '' ;
          this.displayClimb = -1
          this.numberClimb = ''
        }
        else if (this.numberCrossing != undefined && this.numberCrossing != '') {
          this.messageToVant.message += doc.innerText != null ? doc.innerText.replace('\t', '') + ':' + this.numberCrossing + ';' : '' ;
          this.displayCrossing = -1
          this.numberCrossing = ''
        }
        else if (this.numberDescend != undefined && this.numberDescend != '') {
          this.messageToVant.message += doc.innerText != null ? doc.innerText.replace('\t', '') + ':' + this.numberDescend + ';' : '' ;
          this.displayDescend = -1
          this.numberDescend = ''
        }
        else if (this.numberRoute != undefined && this.numberRoute != '') {
          this.messageToVant.message += doc.innerText != null ? doc.innerText.replace('\t', '') + ':' + this.numberRoute + ';' : '' ;
          this.displayRoute = -1
          this.numberRoute = ''
        }
        else if (this.numberSpeed != undefined && this.numberSpeed != '') {
          this.messageToVant.message += doc.innerText != null ? doc.innerText.replace('\t', '') + ':' + this.numberSpeed + ';' : '' ;
          this.displaySpeed = -1
          this.numberSpeed = ''
        }
        else {
          this.messageToVant.message += doc.innerText != null ? doc.innerText.replace('\t', '') + ';' : '';
          if(this.displayComms == 1) this.displayComms = -1
          if(this.displayEmergency == 1) this.displayEmergency = -1
          if(this.displayReport == 1) this.displayReport = -1
        }
      }
    

    console.log(this.messageToVant)


  }

  sendMessage() {

    // if (this.selectedClimb != undefined && this.selectedClimb != '') {
    //   this.messageToVant.climb = this.selectedClimb + ' ' + this.numberClimb;
    // }
    // if (this.selectedRoute != undefined && this.selectedRoute != '') {
    //   this.messageToVant.route = this.selectedRoute + ' ' + this.numberRoute;
    // }
    // if (this.selectedEmergency != undefined && this.selectedEmergency != '') {
    //   this.messageToVant.emergency = this.selectedEmergency;
    // }
    // if (this.selectedDescend != undefined && this.selectedDescend != '') {
    //   this.messageToVant.descend = this.selectedDescend + ' ' + this.numberDescend;
    // }
    // if (this.selectedComms != undefined && this.selectedComms != '') {
    //   this.messageToVant.comms = this.selectedComms;
    // }
    // if (this.selectedSpeed != undefined && this.selectedSpeed != '') {
    //   this.messageToVant.speed = this.selectedSpeed + ' ' + this.numberSpeed;
    // }
    // if (this.selectedReport != undefined && this.selectedReport != '') {
    //   this.messageToVant.report = this.selectedReport;
    // }
    // if (this.selectedCrossing != undefined && this.selectedCrossing != '') {
    //   this.messageToVant.crossing = this.selectedCrossing + ' ' + this.numberCrossing;
    // }

    console.log(this.messageToVant)
    this.httpClientService.sendMessage(this.messageToVant).subscribe(
      response => {
        this.vantResponse = response
      }
    );

   

    this.resetForm()

  }

}
