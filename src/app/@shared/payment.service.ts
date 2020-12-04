import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {PTran} from '../@model/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private apiPrefix = environment.paymentApiPrefix;

  private apiKey = 'e2d81bec4fa55fdcd92e9f7f25d8be6a30bee48fcf3e2016ce12a5e737ccd5a5';

  private merchantId = 24;

  private collectionId = 1;

  private returnUrlIndirect = 'http://localhost:4200/payment-acknowledge';

  constructor(private httpClient: HttpClient) {
  }

  fetchCollectionAndSetCollectionId(): void {
    this.fetchCollection().subscribe(res => {
      console.log(res);
    });
  }

  fillPTranFields(model: PTran): void {
    model.merchantId = this.merchantId;
    model.collectionId = this.collectionId;
    model.returnUrlInDirect = this.returnUrlIndirect;
    model.apiKey = this.apiKey;
    // if (!model.returnUrlDirect) {
    //   model.returnUrlDirect = model.returnUrlInDirect;
    // }
    model.computeCheckSum();
  }

  createTran(model: PTran): Observable<any> {
    const url = this.apiPrefix + '/merchant/transaction/create';
    // return this.httpClient.post(url, model.asHttpParams());
    // this.http.get(url, { observe: 'response' }).subscribe(resp => resp.headers.get('location'))
    return this.httpClient.post(url, model.asHttpParams(), { observe: 'response' });
  }

  fetchCollection(): Observable<any> {
    const url = `${this.apiPrefix}/merchant/${this.merchantId}/collection/list?size&page&sort&order`;
    return this.httpClient.get(url,
      {headers: new HttpHeaders({'x-access-token': this.apiKey})});
  }
}
