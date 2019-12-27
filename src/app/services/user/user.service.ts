import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AppSetting } from 'src/app/setting/app.setting';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<any> {
    return this.http.get(AppSetting.APP_URL + '/users/');
  }

  findUserById(idUser: number): Observable<any> {
    return this.http.get(AppSetting.APP_URL + '/users/' + idUser);
  }

  createUser(user: User): Observable<any> {
    return this.http.post(AppSetting.APP_URL + '/users/add', user);
  }

  login(email: string, password: string): Observable<any> {
    const param = new HttpParams();
    param.append('email', email);
    param.append('password', password);
    return this.http.post(AppSetting.APP_URL + '/users/login', param);
  }

}
