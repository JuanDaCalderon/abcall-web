import {CommonModule} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
//import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [ReactiveFormsModule, CommonModule, TranslateModule],
  standalone: true
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  /*constructor(private formBuilder: FormBuilder, private translate: TranslateService) {
      translate.addLangs(['en', 'es']);
      translate.setDefaultLang('es');
    }*/

  constructor(private formBuilder: FormBuilder) {}

  validateCredentials() {
    console.info('Credenciales correctas');
    //this.toastr.success("Confirmation", "Author created")
    this.loginForm.reset();
  }

  //changeLanguage(lang: string) {
  //  this.translate.use(lang);
  //}
}
