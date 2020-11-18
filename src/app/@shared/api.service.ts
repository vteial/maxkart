import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {LocalStorage, LocalStorageService} from 'ngx-webstorage';
import {environment} from '../../environments/environment';
import {User} from '../@model/core';

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
      this.userMap = res;
      console.log(this.userMap);
    });
  }

  signIn(model: User): boolean {
    let flag = false;
    if (!model.userId || !model.password) {
      return flag;
    }
    const emodel = this.userMap[model.userId];
    if (emodel === undefined) {
      return flag;
    }
    flag = emodel.password === model.password;
    if (flag) {
      this.sessionUser = emodel;
    }
    return flag;
  }

  signOut(): void {
    this.sessionUser = null;
  }
}
