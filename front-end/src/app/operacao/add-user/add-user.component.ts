import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientService } from 'src/app/service/http-client.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  usuarioForm: FormGroup;
  hide = true;
  nome = new FormControl('', [Validators.required]);
  admin = new FormControl(false);
  senha = new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(100)])
  constructor(private router: Router,
    private httpService: HttpClientService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.usuarioForm = this.formBuilder.group({
      autoridades: this.admin,
      nome: this.nome,
      senha: this.senha,
    })
  }

  newUsuario(form: NgForm) {
    this.httpService.addUsuario(form)
      .subscribe(res => {
        this.router.navigate(['/uavs'])
      }, (err) => {
        console.log(err)
      })
  }

  getErrorMessage() {
    if (this.nome.hasError('required')) {
      return 'Digite um nome';
    }

    return this.nome.hasError('nome') ? 'Nome Inválido' : '';
  }

}
