import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {LocalStorage, LocalStorageService} from 'ngx-webstorage';
import {User} from '../@model/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiPrefix = environment.baseApiPrefix;

  @LocalStorage()
  sessionUser: User;

  userMap: Map<string, User>;

  constructor(private httpClient: HttpClient, private storage: LocalStorageService) {
  }

  fetchData(urlSuffix: string): Observable<any> {
    return this.httpClient.get(`${this.apiPrefix}/${urlSuffix}`);
  }

  fetchUsers(): void {
    this.fetchData('users.json').subscribe(res => {
      console.log(res);
    });
  }

}
