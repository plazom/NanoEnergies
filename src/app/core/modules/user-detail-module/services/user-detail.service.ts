import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IUserResponse } from 'src/app/api/interfaces/user-response.interface';
import { ModuleTypeEnum } from 'src/app/language/enums/module-type.enum';
import { LoadUserDetailAction } from 'src/app/store/actions/task.actions';
import { getUserDetail } from 'src/app/store/selectors/task.selector';
import { IAppState } from 'src/app/store/state/app.state';

@Injectable()
export class UserDetailService {
  constructor(private store: Store<IAppState>, private router: Router){}

  getUserDetail$(): Observable<IUserResponse | undefined> {
    return this.store.select(getUserDetail);
  }

  loadUserDetail(id: number): void {
    this.store.dispatch(new LoadUserDetailAction(id));
  }

  goToList(){
    this.router.navigate([ModuleTypeEnum.TASK]);
  }
}
