import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILoginResponse } from '../interfaces/login-response.interface';
import { ILogin } from '../interfaces/login.interface';

@Injectable()
export class ApiService {
  private apiUrl  = 'https://reqres.in/api';
  constructor(private httpClient: HttpClient) {}

  loginToServer$(data: ILogin): Observable<ILoginResponse> {
    return this.httpClient.post<ILoginResponse>(`${this.apiUrl}/register`, data, { responseType: "json" });
  }

  loadUsers$(token: string, page: number): Observable<any>  {
    return this.httpClient.get(`${this.apiUrl}/users?page=${page}`, { headers: new HttpHeaders({'x-access-token': token}), responseType: "json"});
  }

  loadUserDetail$(token: string, id: number): Observable<any>  {
    return this.httpClient.get(`${this.apiUrl}/users/${id}`, { headers: new HttpHeaders({'x-access-token': token}), responseType: "json"});
  }
}
