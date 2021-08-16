import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

export class User {
  constructor(
    public nome: string,
    public senha: string,
    public autoridades: string
  ) { }

}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  authenticate(username, password) {
    let headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    let json = JSON.stringify(username)
    console.log(json)
    return this.httpClient.post<User>('http://localhost:8080/login',json, { headers }).pipe(
      map(
        userData => {
          sessionStorage.setItem('username', username);
          let authString = 'Basic ' + btoa(username + ':' + password);
          sessionStorage.setItem('basicauth', authString);
          sessionStorage.setItem('admin', userData.autoridades )
          return userData;
        }
      )

    );
  }
  
  isUserLoggedIn() {
    let user = sessionStorage.getItem('username')
    return !(user === null)
  }

  isAdmin(){
    let admin = sessionStorage.getItem('admin')
    return (admin !== "true")
  }

  logOut() {
    sessionStorage.removeItem('username')
  }
}