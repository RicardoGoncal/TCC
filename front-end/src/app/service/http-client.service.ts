import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { catchError } from 'rxjs/operators';
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
export class Vants {
  constructor(
    public id: string,
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
@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  readonly pythonApiURL: string;
  readonly javaApiURL: string;
  basic: any;

  constructor(protected httpClient: HttpClient, private auth: AuthenticationService,) {
    this.pythonApiURL = 'http://localhost:5000';
    this.javaApiURL = 'http://localhost:8080';
  }

  sendMessage(messageToVant) {
    let url = `${this.pythonApiURL}/vant`;
    let json =  JSON.stringify(messageToVant)
    return this.httpClient.post(url, json, {headers:{'Content-Type': 'application/json'}});
  }
  getCategorias() {
    let url = `${this.javaApiURL}/categorias`
    this.basic = sessionStorage.getItem('basicauth')

    let headers = new HttpHeaders({ Authorization: this.basic });
    return this.httpClient.get<Usuario>(url, { headers })
  }

  getVants() {
    let url = `${this.javaApiURL}/vants`
    this.basic = sessionStorage.getItem('basicauth')
    let headers = new HttpHeaders({ Authorization: this.basic });

    return this.httpClient.get<Vants[]>(url, { headers })
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

  private handlerError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error)
      return of(result as T)
    }
  }

}