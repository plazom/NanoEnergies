import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ILogin } from 'src/app/api/interfaces/login.interface';
import { LoginToServerAction, SetTokenAction } from 'src/app/store/actions/login.actions';
import { getToken } from 'src/app/store/selectors/login.selector';
import { IAppState } from 'src/app/store/state/app.state';

@Injectable()
export class LoginService {
  timeOut: any;
  constructor( private store: Store<IAppState>){}

  loginToServer(data: ILogin): void {
    this.store.dispatch(new LoginToServerAction(data));
    this.logout();
  }

  getToken$(): Observable<string> {
    return this.store.select(getToken);
  }

  setToken(newToken: string): void {
    this.store.dispatch(new SetTokenAction(newToken));
  }

  logout(time: number = 100000): void {
    if(this.timeOut){
      clearTimeout(this.timeOut);
    }
    this.timeOut = setTimeout(() => {
      this.store.dispatch(new SetTokenAction(''));
    }, time);



  }

}
