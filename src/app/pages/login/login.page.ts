import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthentificationService} from '../../services/authentification.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username = '';
  password = '';
  formLogin: FormGroup;
  submitted = false;

  constructor( private router: Router, private authService: AuthentificationService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formLogin = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() {
    return this.formLogin.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.authService.login(this.username, this.password).subscribe(data => {
      console.log(data);
    }, (error) => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Oops...',
          text: 'login or password incorrect!',
        });
      }
    );
  }
}
