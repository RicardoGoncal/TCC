import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap} from 'rxjs/operators';
import { Jwttoken } from '../models/jwttoken';
import { NgForm } from '@angular/forms';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

const autenticarUsuarioUrl = 'http://localhost:8082/authenticate';


@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor(private http: HttpClient) { }

  authUser (user: NgForm): Observable<Jwttoken> {
    return this.http.post<Jwttoken>(autenticarUsuarioUrl, user, httpOptions).pipe(
      tap((res: Jwttoken) => {
        this.setSession(res.jwtToken);
      })
    );
  }

  private setSession(jwt: string) {
    const add = 10;
    const currentDate = new Date();
    const futureDate = new Date(currentDate.getTime() + add*60000);

    localStorage.setItem('expires_at', futureDate.getTime().toString());
    localStorage.setItem('token', jwt);
  }

  removeSession() {
    localStorage.removeItem('expires_at');
    localStorage.removeItem('token');
  }
}