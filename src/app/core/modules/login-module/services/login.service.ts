import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ILogin } from 'src/app/api/interfaces/login.interface';
import { LoginToServerAction, SetTokenAction } from 'src/app/store/actions/login.actions';
import { getToken } from 'src/app/store/selectors/login.selector';
import { IAppState } from 'src/app/store/state/app.state';

@Injectable()
export class LoginService {
  constructor(private router: Router, private store: Store<IAppState>){}

  loginToServer(data: ILogin): void {
    this.store.dispatch(new LoginToServerAction(data));
  }

  getToken$(): Observable<string> {
    return this.store.select(getToken);
  }

  logout(): void {
    this.store.dispatch(new SetTokenAction(''));
    this.router.navigateByUrl('/login');
  }

}
