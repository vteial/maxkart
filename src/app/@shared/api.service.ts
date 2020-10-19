import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LocalStorage, LocalStorageService} from 'ngx-webstorage';
import {environment} from '../../environments/environment';
import {SearchCriteria} from '../@model/core';
import {User} from '../@model/user';
import {Merchant} from '../@model/merchant';
import {PaymentMethod} from '../@model/payment-method';
import {Subscription} from '../@model/subscriptin';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiPrefix = environment.baseApiPrefix;

  @LocalStorage()
  sessionUser: any;

  private httpHeaderForm = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});

  constructor(private httpClient: HttpClient, private storage: LocalStorageService) {
  }

  getApiPrefix(): string {
    return this.apiPrefix;
  }

  processAndSetSessionUser(model: any): void {
    if (model.roles[0] === 'ROLE_ADMIN') {
      model.roleName = 'Admin';
    }
    model.avatarUrl = 'assets/images/avatar_2x.png';
    if (model.files && !model.files.profilePhoto) {
      const fobject = JSON.parse(model.files);
      model.files = fobject;
      const urlSuffix = 'profilePhoto?apiKey=' + this.sessionUser.accessToken;
      this.sessionUser.avatarUrl = this.apiPrefix + '/user/current/file/' + urlSuffix;
    }
    this.sessionUser = model;
  }

  signIn(model: any): Observable<any> {
    const httpParams = new HttpParams()
      .set('username', model.userId)
      .set('password', model.password);
    return this.httpClient.post(this.apiPrefix + '/auth/signin', httpParams, {headers: this.httpHeaderForm});
  }

  fetchCurrentUser(): Observable<any> {
    return this.httpClient.get(this.apiPrefix + '/user/current',
      {headers: new HttpHeaders({'x-access-token': this.sessionUser.accessToken})});
  }

  signOut(): void {
    this.httpClient.get(this.apiPrefix + '/auth/signout',
      {headers: new HttpHeaders({'x-access-token': this.sessionUser.accessToken})})
      .subscribe((data: any[]) => {
        console.log(data);
      });
    this.sessionUser = null;
  }

  getData(urlSuffix: string): Observable<any> {
    const url = this.apiPrefix + urlSuffix;
    return this.httpClient.get(url,
      {headers: new HttpHeaders({'x-access-token': this.sessionUser.accessToken})});
  }

  // user

  getUsers(searchCriteria: SearchCriteria): Observable<any> {
    const url = this.apiPrefix + '/user/list' + searchCriteria.asHttpParamsString();
    return this.httpClient.get(url,
      {headers: new HttpHeaders({'x-access-token': this.sessionUser.accessToken})});
  }

  findUserById(id: number): Observable<any> {
    const url = this.apiPrefix + '/user/' + id + '/data';
    return this.httpClient.get(url,
      {headers: new HttpHeaders({'x-access-token': this.sessionUser.accessToken})});
  }

  updateUser(model: User): Observable<any> {
    const url = this.apiPrefix + '/user/' + model.id + '/data';
    return this.httpClient.put(url, model.asHttpParams(),
      {headers: new HttpHeaders({'x-access-token': this.sessionUser.accessToken})});
  }

  approveUser(model: User): Observable<any> {
    const url = this.apiPrefix + '/user/' + model.id + '/approve';
    return this.httpClient.post(url, {},
      {headers: new HttpHeaders({'x-access-token': this.sessionUser.accessToken})});
  }

  needMoreInfoUser(id: number, model: HttpParams): Observable<any> {
    const url = this.apiPrefix + '/user/' + id + '/inquiry';
    return this.httpClient.post(url, model,
      {headers: new HttpHeaders({'x-access-token': this.sessionUser.accessToken})});
  }

  rejectUser(model: User): Observable<any> {
    const url = this.apiPrefix + '/user/' + model.id + '/reject';
    return this.httpClient.post(url, {},
      {headers: new HttpHeaders({'x-access-token': this.sessionUser.accessToken})});
  }

  // merchant

  getMerchants(searchCriteria: SearchCriteria): Observable<any> {
    const url = this.apiPrefix + '/merchant/list' + searchCriteria.asHttpParamsString();
    return this.httpClient.get(url,
      {headers: new HttpHeaders({'x-access-token': this.sessionUser.accessToken})});
  }

  findMerchantById(id: number): Observable<any> {
    const url = this.apiPrefix + '/merchant/' + id + '/data';
    return this.httpClient.get(url,
      {headers: new HttpHeaders({'x-access-token': this.sessionUser.accessToken})});
  }

  updateMerchant(model: Merchant): Observable<any> {
    const url = this.apiPrefix + '/merchant/' + model.id + '/data';
    return this.httpClient.put(url, model.asHttpParams(),
      {headers: new HttpHeaders({'x-access-token': this.sessionUser.accessToken})});
  }

  approveMerchant(model: Merchant): Observable<any> {
    const url = this.apiPrefix + '/merchant/' + model.id + '/approve';
    return this.httpClient.post(url, {},
      {headers: new HttpHeaders({'x-access-token': this.sessionUser.accessToken})});
  }

  needMoreInfoMerchant(id: number, model: HttpParams): Observable<any> {
    const url = this.apiPrefix + '/merchant/' + id + '/inquiry';
    return this.httpClient.post(url, model,
      {headers: new HttpHeaders({'x-access-token': this.sessionUser.accessToken})});
  }

  rejectMerchant(model: Merchant): Observable<any> {
    const url = this.apiPrefix + '/merchant/' + model.id + '/reject';
    return this.httpClient.post(url, {},
      {headers: new HttpHeaders({'x-access-token': this.sessionUser.accessToken})});
  }

  // transaction

  getTransactions(searchCriteria: SearchCriteria): Observable<any> {
    const url = this.apiPrefix + '/merchant/transaction/list' + searchCriteria.asHttpParamsString();
    return this.httpClient.get(url,
      {headers: new HttpHeaders({'x-access-token': this.sessionUser.accessToken})});
  }

  findByTranId(id: number): Observable<any> {
    const url = this.apiPrefix + '/transaction/' + id + '/data';
    return this.httpClient.get(url,
      {headers: new HttpHeaders({'x-access-token': this.sessionUser.accessToken})});
  }

  // subscription

  getSubscriptions(searchCriteria: SearchCriteria): Observable<any> {
    const url = this.apiPrefix + '/admin/subscription/list' + searchCriteria.asHttpParamsString();
    return this.httpClient.get(url,
      {headers: new HttpHeaders({'x-access-token': this.sessionUser.accessToken})});
  }

  findSubscriptionById(id: number): Observable<any> {
    const url = this.apiPrefix + '/admin/subscription/' + id + '/data';
    return this.httpClient.get(url,
      {headers: new HttpHeaders({'x-access-token': this.sessionUser.accessToken})});
  }

  createSubscription(model: Subscription): Observable<any> {
    const url = this.apiPrefix + '/subscription/create';
    return this.httpClient.post(url, model.asHttpParams(),
      {headers: new HttpHeaders({'x-access-token': this.sessionUser.accessToken})});
  }

  updateSubscription(model: Subscription): Observable<any> {
    const url = this.apiPrefix + '/admin/subscription/' + model.id + '/data';
    return this.httpClient.put(url, model.asHttpParams(),
      {headers: new HttpHeaders({'x-access-token': this.sessionUser.accessToken})});
  }

  createSubscriptionPaymentMethod(subId: number, model: PaymentMethod): Observable<any> {
    const url = this.apiPrefix + `/subscription/${subId}/payment-method/create`;
    return this.httpClient.post(url, model.asHttpParams(),
      {headers: new HttpHeaders({'x-access-token': this.sessionUser.accessToken})});
  }

  updateSubscriptionPaymentMethod(subId: number, model: PaymentMethod): Observable<any> {
    const url = this.apiPrefix + `/subscription/payment-method/${model.id}/data`;
    return this.httpClient.put(url, model.asHttpParams(),
      {headers: new HttpHeaders({'x-access-token': this.sessionUser.accessToken})});
  }


  // paymentMethod

  getPaymentMethods(searchCriteria: SearchCriteria): Observable<any> {
    const url = this.apiPrefix + '/payment-method/list' + searchCriteria.asHttpParamsString();
    return this.httpClient.get(url,
      {headers: new HttpHeaders({'x-access-token': this.sessionUser.accessToken})});
  }

  findPaymentMethodById(id: number): Observable<any> {
    const url = this.apiPrefix + '/payment-method/' + id + '/data';
    return this.httpClient.get(url,
      {headers: new HttpHeaders({'x-access-token': this.sessionUser.accessToken})});
  }

  createPaymentMethod(model: PaymentMethod): Observable<any> {
    const url = this.apiPrefix + '/payment-method/create';
    return this.httpClient.post(url, model.asHttpParams(),
      {headers: new HttpHeaders({'x-access-token': this.sessionUser.accessToken})});
  }

  updatePaymentMethod(model: PaymentMethod): Observable<any> {
    const url = this.apiPrefix + '/payment-method/' + model.id + '/data';
    return this.httpClient.put(url, model.asHttpParams(),
      {headers: new HttpHeaders({'x-access-token': this.sessionUser.accessToken})});
  }

  // file-upload
  uploadData(ename: string, id: number, name: string, value: any): Observable<any> {
    const formData = new FormData();
    formData.append(name, value);
    const url = this.apiPrefix + '/' + ename + '/' + id + '/file/upload';
    return this.httpClient.post(url, formData,
      {headers: new HttpHeaders({'x-access-token': this.sessionUser.accessToken})});
  }

}

