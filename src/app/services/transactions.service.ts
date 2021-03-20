import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  baseUrl = environment.api_url ;

  // tslint:disable-next-line:variable-name
  private _refresNeeded$ = new Subject<void>() ;

  get refresNeeded$(): any {
    return this._refresNeeded$ ;
  }
  constructor(private httpClient: HttpClient) { }

  calculFrais(montant): Observable<any> {
    return this.httpClient.post(`${ this.baseUrl }/transactions/tarif`, montant) ;
  }

  transactionDepot(depot: any): Observable<any> {
    return this.httpClient.post(`${ this.baseUrl }/transactions/depot`, depot).pipe(
      tap(() => {
        this._refresNeeded$.next() ;
      })
    ) ;
  }

  infoDepot(info: any): Observable<any> {
    return this.httpClient.post(`${ this.baseUrl }/transactions/info`, info) ;
  }
  transactionRetrait(retrait: any): Observable<any> {
    return this.httpClient.post(`${ this.baseUrl }/transactions/retrait`, retrait).pipe(
      tap(() => {
        this._refresNeeded$.next() ;
      })
    ) ;
  }
  myTransaction(id: number){
    // @ts-ignore
    return this.httpClient.get(`${ this.baseUrl }/users/transaction/` + id ) ;
  }

  AllTransaction(){
    return this.httpClient.get(`${ this.baseUrl }/transactions`) ;
  }

  montantCompte(){
    return this.httpClient.get(`${ this.baseUrl }/montantCompte`);
  }
}
