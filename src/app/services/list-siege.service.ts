import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ListSiegeService {
  baseUrl = environment.api_url ;
  // tslint:disable-next-line:variable-name
  private _refresNeeded$ = new Subject<void>() ;

  get refresNeeded$(): any {
    return this._refresNeeded$ ;
  }
  constructor(private httpClient: HttpClient) { }

  myTarif(){
    return this.httpClient.get(`${ this.baseUrl }/tableau_frais`) ;
  }

  myPart(){
    return this.httpClient.get(`${ this.baseUrl }/commissions`) ;
  }

  myUsers(){
    return this.httpClient.get(`${ this.baseUrl }/users?statut=false`) ;
  }

  oneUsers(id: number){
    return this.httpClient.get(`${ this.baseUrl }/users/` + id) ;
  }
  myProfils(){
    return this.httpClient.get(`${ this.baseUrl }/profils`) ;
  }

  addUser(users: any): Observable<any>{
    return this.httpClient.post(`${ this.baseUrl }/users`, users) ;
  }
  editUser(users: any, id: number): Observable<any>{
    return this.httpClient.put(`${ this.baseUrl }/users/` + id, users) ;
  }

  myCompte(){
    return this.httpClient.get(`${ this.baseUrl }/comptes?statut=false`) ;
  }

  addCompte(compte: any){
    return this.httpClient.post(`${ this.baseUrl }/comptes`, compte) ;
  }

  retourId(nomAgence): Observable<any> {
    return this.httpClient.post(`${ this.baseUrl }/transactions/numerocompte`, nomAgence) ;
  }
  rechargeCompte(montant, id: number): Observable<any> {
    return this.httpClient.put(`${ this.baseUrl }/rechargeComptes/` + id, montant).pipe(
      tap(() => {
        this._refresNeeded$.next() ;
      })
    );
  }

  myListDepot(){
    return this.httpClient.get(`${ this.baseUrl }/depots`) ;
  }

  annulerDepot(code): Observable<any> {
    return this.httpClient.post(`${ this.baseUrl }/transaction/annuler`, code).pipe(
      tap(() => {
        this._refresNeeded$.next() ;
      })
    ) ;
  }

  deleteCompte(id: number): Observable<any> {
    return this.httpClient.delete(`${ this.baseUrl }/comptes/` + id).pipe(
      tap(() => {
        this._refresNeeded$.next() ;
      })
    );
  }

  annulerRecharge(): Observable<any> {
    return this.httpClient.delete(`${ this.baseUrl }/rechargeComptes/annuler`).pipe(
      tap(() => {
        this._refresNeeded$.next() ;
      })
    );
  }
}
