import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TempoCapitais } from '../models/TempoCapitais';

@Injectable({
  providedIn: 'root'
})
export class ClimaService {

  readonly tempCapitaisApiURL: string;

  constructor(protected httpClient: HttpClient) { 
    this.tempCapitaisApiURL = 'https://apitempo.inmet.gov.br/condicao/capitais';
  }

  getClima() {
    const date = new Date();
    const dia = date.getDate()
    const mes = date.getMonth()+1
    const ano = date.getFullYear()
    
    let url = `${this.tempCapitaisApiURL}/${ano}-${mes}-${dia}`

    return this.httpClient.get<TempoCapitais[]>(url).pipe(
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
