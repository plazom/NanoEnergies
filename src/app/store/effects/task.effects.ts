import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { switchMap, withLatestFrom, filter } from 'rxjs/operators';
import { ILoadUserDetailResponse } from 'src/app/api/interfaces/load-user-detail-response.interface';
import { IUsersResponse } from 'src/app/api/interfaces/users-response.interface';
import { ApiService } from 'src/app/api/services/api.service';
import { ModuleTypeEnum } from 'src/app/language/enums/module-type.enum';
import { ETaskActions, LoadDataAction, LoadDataSuccessAction, LoadUserDetailAction, LoadUserDetailSuccessAction } from '../actions/task.actions';
import { IAppState } from '../state/app.state';


@Injectable()
export class TaskEffects {

  loadData$ = createEffect( () => this._actions$.pipe(
    ofType<LoadDataAction>(ETaskActions.LoadData),
    withLatestFrom(this.store$),
    filter(([_, storeState]) => {
      const hasToken = Boolean(storeState.login.token);
      if(!hasToken){
        this.router.navigate([ModuleTypeEnum.LOGIN]);
      }
      return hasToken;
    }),
    switchMap( ([action, storeState]) => {
      return this.apiService.loadUsers$(storeState.login.token, action.page);
    }),
    switchMap((data: IUsersResponse) => {
      return of(new LoadDataSuccessAction(data));
    })
  ));

  loadUserDetail$ = createEffect( () => this._actions$.pipe(
    ofType<LoadUserDetailAction>(ETaskActions.LoadUserDetail),
    withLatestFrom(this.store$),
    filter(([_, storeState]) => {
      const hasToken = Boolean(storeState.login.token);
      if(!hasToken){
        this.router.navigate([ModuleTypeEnum.LOGIN]);
      }
      return hasToken;
    }),
    switchMap( ([action, storeState]) => {
      return this.apiService.loadUserDetail$(storeState.login.token, action.id);
    }),
    switchMap((detailResponse: ILoadUserDetailResponse) => {
      return of(new LoadUserDetailSuccessAction(detailResponse.data));
    })
  ));
  constructor(
    private router: Router,
    private store$: Store<IAppState>,
    private apiService: ApiService,
    private _actions$: Actions) {}
}
