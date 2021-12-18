import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
export class Uav{
  constructor(
    public id: string,
    public nome: string,
  ) { }
}

export class Mensagem{
  constructor(
    public id: string,
    public mensagem: string,
  ) { }
}
@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  basic: any;

  constructor( private httpClient: HttpClient) {  }

  getUavs() {
    this.basic = sessionStorage.getItem('basicauth')
    let headers = new HttpHeaders({ Authorization: this.basic });
    return this.httpClient.get<Uav[]>('http://localhost:8080/Uav', { headers })
    .pipe(
      tap(uav => console.log('leu os Uav' + uav)),
      catchError(this.handlerError('getCliente', []))
    );
  }

  private handlerError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error)
      return of(result as T)
    }
  }

  getMensagem(type: string){

    let url = `http://localhost:8080/mensagens/${type}`
    
    this.basic = sessionStorage.getItem('basicauth')
    let headers = new HttpHeaders({ Authorization: this.basic });
    return this.httpClient.get<Mensagem[]>(url, { headers })
    .pipe(
      tap(mensagens => console.log('leu as mensagens' + mensagens)),
      catchError(this.handlerError('getMensagem', []))
    )
  }

}