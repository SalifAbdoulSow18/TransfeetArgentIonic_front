import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  baseUrl = environment.api_url ;
  constructor(private httpClient: HttpClient) { }

  calculFrais(montant): Observable<any> {
    return this.httpClient.post(`${ this.baseUrl }/transactions/tarif`, montant) ;
  }

  transactionDepot(depot: any): Observable<any> {
    return this.httpClient.post(`${ this.baseUrl }/transactions/depot`, depot) ;
  }

  infoDepot(info: any): Observable<any> {
    return this.httpClient.post(`${ this.baseUrl }/transactions/info`, info) ;
  }
  transactionRetrait(retrait: any): Observable<any> {
    return this.httpClient.post(`${ this.baseUrl }/transactions/retrait`, retrait) ;
  }
  myTransaction(id: number){
    return this.httpClient.get(`${ this.baseUrl }/users/transaction/` + id) ;
  }
}
