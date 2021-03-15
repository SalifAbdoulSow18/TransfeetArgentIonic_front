import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';
import Swal from 'sweetalert2';
import {LoadingController} from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  constructor(private http: HttpClient, private router: Router, private loadingctrl: LoadingController) { }
  // tslint:disable-next-line:new-parens
  helpers = new JwtHelperService;
  baseUrl = environment.api_url;
  private loading;

  login(username: string, password: string) {
    // console.log(this.baseUrl);
    return this.http.post(this.baseUrl + '/login', {
      username, password
    })
      .pipe(
        map ((response: any ) => {
          const tokenDecode = this.helpers.decodeToken(response.token);
          console.log(tokenDecode);

          // stockage de token d'un users dans le localStorage!!!
          localStorage.setItem('token', response.token);
          localStorage.setItem('id', tokenDecode.id);
          localStorage.setItem('username', tokenDecode.username);
          localStorage.setItem('role', tokenDecode.roles);
          localStorage.setItem('archive', tokenDecode.status);
          // la redirection à partir des roles
          // @ts-ignore
          if (localStorage.getItem('archive') === 'false') {
            if (localStorage.getItem('role') === 'ROLE_AdminAgence' || localStorage.getItem('role') === 'ROLE_UserAgence') {
              // console.log(localStorage.getItem('role'));
              this.router.navigate(['/agence']);
            } else {
              Swal.fire({
                icon: 'error',
                title: 'You are not allowed!',
                text: 'Verified your data',
                confirmButtonColor: '#d33'
              });
            }
          } else {
            Swal.fire({
              icon: 'error',
              title: 'You are not allowed!',
              text: 'Ask the administration!',
              confirmButtonColor: '#d33'
            });
          }
        })
      ) ;
  }

  loadingConnex() {
    this.loadingctrl.create({
      message: 'Connexion...'
    }).then((overlay) => { this.loading = overlay;
                           this.loading.present();
                           setTimeout(() =>{this.loading.dismiss();}, 200);
    });
  }
  // verifier la connexion
  isLogin() {
    if (localStorage.getItem('token')) {
      return true;
    }
    return false;
  }
 // recuperation du token
  getToken(key: any) {
    const token = localStorage.getItem('token');
    if (token !== 'undifined') {
      return token;
    }else {
      return null;
    }
  }
 // la deconnexion
  logout() {
    return localStorage.removeItem('token') ;
  }
}
