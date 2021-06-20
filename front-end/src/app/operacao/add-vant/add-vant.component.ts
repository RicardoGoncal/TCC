import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientService } from 'src/app/service/http-client.service';

@Component({
  selector: 'app-add-vant',
  templateUrl: './add-vant.component.html',
  styleUrls: ['./add-vant.component.css']
})
export class AddVantComponent implements OnInit {

  vantForm: FormGroup;

  constructor(private router: Router,
    private httpService: HttpClientService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.vantForm = this.formBuilder.group({
      'nome': [null, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
    })
  }

  newVant(form: NgForm) {
    this.httpService.addVant(form)
      .subscribe(res => {
        this.router.navigate(['/vants'])
      }, (err) => {
        console.log(err)
      })
  }

}
