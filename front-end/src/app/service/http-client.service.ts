import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

export class Categoria {
  constructor(
    public id: string,
    public nome: string,
  ) { }
}
export class Usuario {
  constructor(
    public username: string,
    public password: string,
  ) { }

}
export class Uavs {
  constructor(
    public id: string,
    public nome: string,
  ) { }
}
export class Uav {
  constructor(
    public nome: string,
  ) { }
}
export class Mensagem {
  constructor(
    public id: string,
    public mensagem: string,
    public categoria: {
      id:string,
      nome:string
    },
  ) { }
}

export class SendMessage {
  [key: string]: any
}
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
    return this.httpClient.post(url, json, {headers:{'Content-Type': 'application/json'}});
  }

  getCategorias() {
    let url = `${this.javaApiURL}/categorias`
    this.basic = sessionStorage.getItem('basicauth')

    let headers = new HttpHeaders({ Authorization: this.basic });
    return this.httpClient.get<Usuario>(url, { headers })
  }

  getUavs() {
    let url = `${this.javaApiURL}/uavs`
    this.basic = sessionStorage.getItem('basicauth')
    let headers = new HttpHeaders({ Authorization: this.basic });

    return this.httpClient.get<Uavs[]>(url, { headers })
      .pipe(
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



    console.log(json)

    return this.httpClient.post(url, json, {headers:{'Content-Type': 'application/json'}})
      .pipe(
        catchError(this.handlerError('getMensagem', []))
      )
  }

  private handlerError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error)
      return of(result as T)
    }
  }

}