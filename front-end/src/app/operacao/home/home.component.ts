import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientService } from '../../service/http-client.service'
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
interface Mensagem {
  id: string;
  mensagem: string;
  categoria: {
    id: string,
    nome: string
  }
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

  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow;

  FAIL_FLAG: boolean;
  uavId: number;

  uavResponse: any;

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

  numberClimb: string = '';
  numberRoute: string = '';
  numberDescend: string = '';
  numberSpeed: string = '';
  numberCrossing: string = '';

  messageToUav: SendMessage = {};

  href: string = '';
  latDest: string = '';
  lngDest: string = '';
  positionDest = {
    lat: -23.5169413,
    lng: -46.8353236,
  };

  constructor(
    private httpClientService: HttpClientService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.params.subscribe(params => this.uavId = params['id']);
  }


  ngOnInit() {
    this.FAIL_FLAG = false
    this.messageToUav.message = ''
    this.messageToUav.user = sessionStorage.getItem('username')
    this.messageToUav.uav = this.uavId
    this.messageToUav.port = 5000 + Number(this.uavId)

    this.href = this.router.url;
    this.latDest = "latitude".concat(this.href).replace("/uavs/", "");
    this.lngDest = "longitude".concat(this.href).replace("/uavs/", "");

    this.positionDest = {
      lat: localStorage.getItem(this.latDest) != null ? Number(localStorage.getItem(this.latDest)) : -23.5169413,
      lng: localStorage.getItem(this.lngDest) != null ? Number(localStorage.getItem(this.lngDest)) : -46.8353236,
    };
    this.addDest(this.positionDest.lat, this.positionDest.lng)
  }

  excluir(displayType: string) {
    if (displayType == 'displayClimb') { this.displayClimb = 0, this.selectedClimb = '', this.numberClimb = ''; }
    if (displayType == 'displayRoute') { this.displayRoute = 0, this.selectedRoute = '', this.numberRoute = ''; }
    if (displayType == 'displayEmergency') { this.displayEmergency = 0, this.selectedEmergency = ''; }
    if (displayType == 'displayDescend') { this.displayDescend = 0, this.selectedDescend = '', this.numberDescend = ''; }
    if (displayType == 'displayComms') { this.displayComms = 0, this.selectedComms = ''; }
    if (displayType == 'displaySpeed') { this.displaySpeed = 0, this.selectedSpeed = '', this.numberDescend = ''; }
    if (displayType == 'displayReport') { this.displayReport = 0, this.selectedReport = ''; }
    if (displayType == 'displayCrossing') { this.displayCrossing = 0, this.selectedCrossing = '', this.numberCrossing = ''; }
    this.maxMensagem--;
    this.maxMensagemDisplay = 0;
  }

  resetForm() {

    this.messageToUav = {};
    this.messageToUav.message = ''
    this.messageToUav.uav = this.uavId
    this.messageToUav.port = 5000 + Number(this.uavId)

    this.displayClimb = 0
    this.selectedClimb = ''
    this.displayRoute = 0
    this.selectedRoute = ''
    this.displayEmergency = 0
    this.selectedEmergency = ''
    this.displayDescend = 0
    this.selectedDescend = ''
    this.displayComms = 0
    this.selectedComms = ''
    this.displaySpeed = 0
    this.selectedSpeed = ''
    this.displayReport = 0
    this.selectedReport = ''
    this.displayCrossing = 0
    this.selectedCrossing = ''
    this.numberClimb = ''
    this.numberRoute = ''
    this.numberDescend = ''
    this.numberSpeed = ''
    this.numberCrossing = ''
    this.maxMensagem = 1
    this.maxMensagemDisplay = 0
  }

  getMessages(type: string) {
    console.log(this.displayClimb)
    this.httpClientService.getMensagem(type).subscribe(
      response => {
        if (this.maxMensagem < 6 && this.maxMensagemDisplay < 1) {
          if (type == 'climb' && this.displayClimb == 0) {
            this.mensagensClimb = response
            this.displayClimb = 1;
          } else if (type == 'route' && this.displayRoute == 0) {
            this.mensagensRoute = response
            this.displayRoute = 1;
          } else if (type == 'emergency' && this.displayEmergency == 0) {
            this.mensagensEmergency = response
            this.displayEmergency = 1;
          } else if (type == 'descend' && this.displayDescend == 0) {
            this.mensagensDescend = response
            this.displayDescend = 1;
          } else if (type == 'comms' && this.displayComms == 0) {
            this.mensagensComms = response
            this.displayComms = 1;
          } else if (type == 'speed' && this.displaySpeed == 0) {
            this.mensagensSpeed = response
            this.displaySpeed = 1;
          } else if (type == 'report' && this.displayReport == 0) {
            this.mensagensReport = response
            this.displayReport = 1;
          } else if (type == 'crossing' && this.displayCrossing == 0) {
            this.mensagensCrossing = response
            this.displayCrossing = 1;
          }
          this.maxMensagem++;
          this.maxMensagemDisplay = 1;
        }
      }

    );
  }

  addMessage(type: any) {

    var doc = document.getElementById(type)

    if (doc != null) {
      if (doc.innerText == null || doc.innerText == '' || doc.innerText == undefined) {
        console.log('ERRO')
        return
      }

      if (this.numberClimb != undefined && this.numberClimb != '') {
        var climb = doc.innerText != null ? doc.innerText.replace('\t', '') + ' ' + this.numberClimb + ';' : '';
        this.messageToUav.message += climb.replace('FL ', 'FL')
        this.displayClimb = -1
        this.numberClimb = ''
      }
      else if (this.numberCrossing != undefined && this.numberCrossing != '') {
        this.messageToUav.message += doc.innerText != null ? doc.innerText.replace('\t', '') + ' ' + this.numberCrossing + ';' : '';
        this.displayCrossing = -1
        this.numberCrossing = ''
      }
      else if (this.numberDescend != undefined && this.numberDescend != '') {
        this.messageToUav.message += doc.innerText != null ? doc.innerText.replace('\t', '') + ' ' + this.numberDescend + ';' : '';
        this.displayDescend = -1
        this.numberDescend = ''
      }
      else if (this.numberRoute != undefined && this.numberRoute != '') {
        this.messageToUav.message += doc.innerText != null ? doc.innerText.replace('\t', '') + ' ' + this.numberRoute + ';' : '';
        this.displayRoute = -1
        this.numberRoute = ''
      }
      else if (this.numberSpeed != undefined && this.numberSpeed != '') {
        this.messageToUav.message += doc.innerText != null ? doc.innerText.replace('\t', '') + ' ' + this.numberSpeed + ';' : '';
        this.displaySpeed = -1
        this.numberSpeed = ''
      }
      else {
        this.messageToUav.message += doc.innerText != null ? doc.innerText.replace('\t', '') + ';' : '';
        if (this.displayComms == 1) this.displayComms = -1
        if (this.displayEmergency == 1) this.displayEmergency = -1
        if (this.displayReport == 1) this.displayReport = -1
      }
      this.maxMensagemDisplay = 0

    }
  }

  sendMessage() {
    if (this.FAIL_FLAG) {
      this.httpClientService.sendMessageFail(this.messageToUav).subscribe(
        response => {
          this.uavResponse = response
        }
      );
    } else {
      this.httpClientService.sendMessage(this.messageToUav).subscribe(
        response => {
          this.uavResponse = response
        }
      );
    }

    this.resetForm()
  }

  title = 'Gmaps';

  position = {
    lat: -23.5169413,
    lng: -46.8353236,
  };

  options: google.maps.MapOptions = {
    zoom: 5,
    center: this.position,
    disableDefaultUI: false,
    zoomControl: true,
    streetViewControl: false,
    rotateControl: true,
    scaleControl: true,
  };

  markerPositionInitial: google.maps.LatLngLiteral = this.position

  markerPositionDest: google.maps.LatLngLiteral = this.positionDest

  vertices: google.maps.LatLngLiteral[] = [
    this.position, this.positionDest
  ]

  openInfoWindow(marker: MapMarker) {
    this.infoWindow.open(marker);
  }

  InfoWindow2() {
    this.infoWindow.open();
  }

  addDest(latitude, longitude) {
    localStorage.setItem(this.latDest, latitude);
    localStorage.setItem(this.lngDest, longitude);
    this.positionDest.lat = Number(latitude)
    this.positionDest.lng = Number(longitude)
    this.markerPositionDest = { lat: this.positionDest.lat, lng: this.positionDest.lng }
    this.vertices = [this.position, this.positionDest]
  };

}