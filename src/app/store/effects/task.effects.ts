import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DataApiService } from 'src/app/api/services/data-api.service';
import { ETaskActions, LoadDataAction, LoadDataSuccessAction } from '../actions/task.actions';


@Injectable()
export class TaskEffects {

  loadData$ = createEffect( () => this._actions$.pipe(
    ofType<LoadDataAction>(ETaskActions.LoadData),
    switchMap((action) => {
      const url = '';
      return this.dataApiService.getData$(url);
    }),
    switchMap((data: any) => {
      return of(new LoadDataSuccessAction(data));
    })
  ));

  constructor(
    private dataApiService: DataApiService,
    private _actions$: Actions) {}
}
