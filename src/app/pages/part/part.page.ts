import { Component, OnInit } from '@angular/core';
import {ListSiegeService} from '../../services/list-siege.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-part',
  templateUrl: './part.page.html',
  styleUrls: ['./part.page.scss'],
})
export class PartPage implements OnInit {
  infoPart: any;
  constructor(private part: ListSiegeService,
              private router: Router) {
    this.part.myPart().subscribe(data => {
      console.log(data[0]);
      this.infoPart = data[0] ;
    }) ;
  }

  ngOnInit() {
  }

}
