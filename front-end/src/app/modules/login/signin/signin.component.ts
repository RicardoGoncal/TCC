import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

import { AuthenticateService } from '../../../shared/services/authenticate.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  authForm: FormGroup;
  authError: boolean = false;

  constructor(private router: Router, private authenticateService: AuthenticateService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.authForm = this.formBuilder.group({
      'username' : [null, [Validators.required]],
      'password' : [null, [Validators.required]]
    });
  }

  authUser(form: NgForm) {
    this.authenticateService.authUser(form)
      .subscribe(res => {
          this.authError = false;
          this.router.navigate(['/clients']);
        }, (err) => {
          this.authError = true;
        });
  }

}