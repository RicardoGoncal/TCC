import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Uav } from '../models/Uav';
import { Uavs } from '../models/Uavs';
import { Mensagem } from '../models/Mensagem';
import { ResponseMessage } from '../models/ResponseMessage';
@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  readonly pythonApiURL: string;
  readonly javaApiURL: string;
  readonly cadastrarUav: string;
  readonly startUavServer:string;
  basic: any;

  constructor(protected httpClient: HttpClient, private auth: AuthenticationService,) {
    this.pythonApiURL = 'http://localhost:5000';
    this.javaApiURL = 'http://localhost:8080';
    this.cadastrarUav = 'http://localhost:8080';
    this.startUavServer = 'http://localhost:8085';
  }

  addUav(uav): Observable<Uav> {

    let url = `${this.javaApiURL}/uavs`
    this.basic = sessionStorage.getItem('basicauth')

    return this.httpClient.post<Uav>(url, uav, {headers:{Authorization: this.basic,'Content-Type': 'application/json'}})
      .pipe(
        tap((uav: Uav) => console.log('Adicionou o uav')),
        catchError(this.handlerError<Uav>('addUav'))
      )
  }

  sendMessage(messageToUav) {
    let url = `${this.pythonApiURL}/uav`;
    let json =  JSON.stringify(messageToUav)
    return this.httpClient.post<ResponseMessage>(url, json, {headers:{'Content-Type': 'application/json'}});
  }

  sendMessageFail(messageToUav) {
    let url = `${this.pythonApiURL}/fail`;
    let json =  JSON.stringify(messageToUav)
    let res =this.httpClient.post<ResponseMessage>(url, json, {headers:{'Content-Type': 'application/json'}})
    console.log(res)
    return res;
  }

  getUavs() {
    let url = `${this.javaApiURL}/uavs`
    this.basic = sessionStorage.getItem('basicauth')
    sessionStorage.setItem('lastId', "1");
    let headers = new HttpHeaders({ Authorization: this.basic });

    return this.httpClient.get<Uavs[]>(url, { headers }).pipe(
        map(
          uavs => {
            sessionStorage.setItem('lastId',uavs[uavs.length-1].id);
            return uavs
          }
        ),
        catchError(this.handlerError('getCliente', []))
      );
  }

  getMensagem(type: string) {
    let url = `${this.javaApiURL}/mensagens/${type}`
    this.basic = sessionStorage.getItem('basicauth')
    let headers = new HttpHeaders({ Authorization: this.basic });

    return this.httpClient.get<Mensagem[]>(url, { headers })
      .pipe(
        catchError(this.handlerError('getMensagem', []))
      )
  }

  startUav(port){
    let url = `${this.startUavServer}/start`

    let json =  JSON.stringify(port)

    return this.httpClient.post(url, json, {headers:{'Content-Type': 'application/json'}})
      .pipe(
        catchError(this.handlerError('getMensagem', []))
      )
  }

  addUsuario(form){
    let url = `${this.javaApiURL}/new`
    let json =  JSON.stringify(form)
    this.basic = sessionStorage.getItem('basicauth')
    let headers = new HttpHeaders({ Authorization: this.basic, 'Content-Type': 'application/json' });


    return this.httpClient.post(url, json, {headers})
      .pipe(
        catchError(this.handlerError('createUser', []))
      )
  }

  private handlerError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error)
      return of(result as T)
    }
  }

}