import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

export class Categoria{
  constructor(
    public id:string,
    public nome:string,
  ) {}
}

export class Usuario {
  constructor(
    public username: string,
    public password: string,
  ) { }

}

export class Vants{
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

  constructor( private httpClient: HttpClient,
    private auth: AuthenticationService  ) {  }

  getCategorias() {
    
    this.basic = sessionStorage.getItem('basicauth')
     
    let headers = new HttpHeaders({ Authorization: this.basic });
    return this.httpClient.get<Usuario>('http://localhost:8080/categorias', { headers })
    
  }

  getVants() {
    this.basic = sessionStorage.getItem('basicauth')
    let headers = new HttpHeaders({ Authorization: this.basic });
    return this.httpClient.get<Vants[]>('http://localhost:8080/vants', { headers })
    .pipe(
      tap(vants => console.log('leu os vants' + vants)),
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