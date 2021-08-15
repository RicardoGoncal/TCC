import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientService } from 'src/app/service/http-client.service';

@Component({
  selector: 'app-add-uav',
  templateUrl: './add-uav.component.html',
  styleUrls: ['./add-uav.component.css']
})
export class AddUavComponent implements OnInit {

  uavForm: FormGroup;

  constructor(private router: Router,
    private httpService: HttpClientService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.uavForm = this.formBuilder.group({
      'nome': [null, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
    })
  }

  newUav(form: NgForm) {
    this.httpService.addUav(form)
      .subscribe(res => {
        this.router.navigate(['/uavs'])
      }, (err) => {
        console.log(err)
      })
  }

}
