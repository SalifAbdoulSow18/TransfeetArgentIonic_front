import { Component } from '@angular/core';
import {AuthentificationService} from './services/authentification.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private authService: AuthentificationService) {}

  // verify if someone connected
  isLogin() {
    return this.authService.isLogin();
  }
}
