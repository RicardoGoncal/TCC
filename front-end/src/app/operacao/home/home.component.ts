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

  displayClimb: boolean = false;
  displayRoute: boolean = false;
  displayEmergency: boolean = false;
  displayDescend: boolean = false;
  displayComms: boolean = false;
  displaySpeed: boolean = false;
  displayReport: boolean = false;
  displayCrossing: boolean = false;

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
    if (displayType == 'displayClimb') { this.displayClimb = false, this.selectedClimb = ''; }
    if (displayType == 'displayRoute') { this.displayRoute = false, this.selectedRoute = ''; }
    if (displayType == 'displayEmergency') { this.displayEmergency = false, this.selectedEmergency = ''; }
    if (displayType == 'displayDescend') { this.displayDescend = false, this.selectedDescend = ''; }
    if (displayType == 'displayComms') { this.displayComms = false, this.selectedComms = ''; }
    if (displayType == 'displaySpeed') { this.displaySpeed = false, this.selectedSpeed = ''; }
    if (displayType == 'displayReport') { this.displayReport = false, this.selectedReport = ''; }
    if (displayType == 'displayCrossing') { this.displayCrossing = false, this.selectedCrossing = ''; }

    this.maxMensagem--;
    this.maxMensagemDisplay = 0;
  }

  resetForm() {

    this.messageToVant = {};

    this.displayClimb = false, this.selectedClimb = '',
    this.displayRoute = false, this.selectedRoute = '',
    this.displayEmergency = false, this.selectedEmergency = '',
    this.displayDescend = false, this.selectedDescend = '',
    this.displayComms = false, this.selectedComms = '',
    this.displaySpeed = false, this.selectedSpeed = '',
    this.displayReport = false, this.selectedReport = '',
    this.displayCrossing = false, this.selectedCrossing = '',

    this.maxMensagem = 1;
    this.maxMensagemDisplay = 0;
  }

  getMessages(type: string) {
    this.httpClientService.getMensagem(type).subscribe(
      response => {
        if(this.maxMensagem < 6 && this.maxMensagemDisplay < 1){
          if ( type == 'climb' && this.displayClimb == false) {
            this.mensagensClimb = response
            this.displayClimb = true;
            this.maxMensagem++;
            this.maxMensagemDisplay = 1;

          } else if (type == 'route' && this.displayRoute == false) {
            this.mensagensRoute = response
            this.displayRoute = true;
            this.maxMensagem++;
            this.maxMensagemDisplay = 1;

          } else if (type == 'emergency' && this.displayEmergency == false) {
            this.mensagensEmergency = response
            this.displayEmergency = true;
            this.maxMensagem++;
            this.maxMensagemDisplay = 1;
          } else if (type == 'descend' && this.displayDescend == false) {
            this.mensagensDescend = response
            this.displayDescend = true;
            this.maxMensagem++;
            this.maxMensagemDisplay = 1;
          } else  if (type == 'comms' && this.displayComms == false) {
            this.mensagensComms = response
            this.displayComms = true;
            this.maxMensagem++;
            this.maxMensagemDisplay = 1;
          }  else  if (type == 'speed' && this.displaySpeed == false) {
            this.mensagensSpeed = response
            this.displaySpeed = true;
            this.maxMensagem++;
            this.maxMensagemDisplay = 1;
          } else if (type == 'report' && this.displayReport == false) {
            this.mensagensReport = response
            this.displayReport = true;
            this.maxMensagem++;
            this.maxMensagemDisplay = 1;
          } else if (type == 'crossing' && this.displayCrossing == false) {
            this.mensagensCrossing = response
            this.displayCrossing = true;
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
          this.displayClimb = false
          this.numberClimb = ''
        }
        else if (this.numberCrossing != undefined && this.numberCrossing != '') {
          this.messageToVant.message += doc.innerText != null ? doc.innerText.replace('\t', '') + ':' + this.numberCrossing + ';' : '' ;
          this.displayCrossing = false
          this.numberCrossing = ''
        }
        else if (this.numberDescend != undefined && this.numberDescend != '') {
          this.messageToVant.message += doc.innerText != null ? doc.innerText.replace('\t', '') + ':' + this.numberDescend + ';' : '' ;
          this.displayDescend = false
          this.numberDescend = ''
        }
        else if (this.numberRoute != undefined && this.numberRoute != '') {
          this.messageToVant.message += doc.innerText != null ? doc.innerText.replace('\t', '') + ':' + this.numberRoute + ';' : '' ;
          this.displayRoute = false
          this.numberRoute = ''
        }
        else if (this.numberSpeed != undefined && this.numberSpeed != '') {
          this.messageToVant.message += doc.innerText != null ? doc.innerText.replace('\t', '') + ':' + this.numberSpeed + ';' : '' ;
          this.displaySpeed = false
          this.numberSpeed = ''
        }
        else {
          this.messageToVant.message += doc.innerText != null ? doc.innerText.replace('\t', '') + ';' : '';
          this.displayComms = false
          this.displayEmergency = false
          this.displayReport = false
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
