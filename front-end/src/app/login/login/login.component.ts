import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = ''
  password = ''
  invalidLogin = false
  hide = true;

  constructor(private router: Router,
    private loginservice: AuthenticationService) { }

  ngOnInit() {
  }

  checkLogin() {
    this.loginservice.authenticate(this.username, this.password).subscribe(
      res => {
        this.router.navigate(['uavs'])
        this.invalidLogin = false
      },
      error => {
        this.invalidLogin = true

      }
    );

  }

}