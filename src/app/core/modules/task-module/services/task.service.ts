import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IUsersResponse } from 'src/app/api/interfaces/users-response.interface';
import { ModuleTypeEnum } from 'src/app/language/enums/module-type.enum';
import { LoadDataAction } from 'src/app/store/actions/task.actions';
import { getTaskData } from 'src/app/store/selectors/task.selector';
import { IAppState } from 'src/app/store/state/app.state';

@Injectable()
export class TaskService {
  constructor(private store: Store<IAppState>, private router: Router){}

  getTaskData$(): Observable<IUsersResponse | undefined> {
    return this.store.select(getTaskData);
  }

  loadTaskData(page: number): void {
    this.store.dispatch(new LoadDataAction(page));
  }

  goToDetail(id: number){
    this.router.navigate([`${ModuleTypeEnum.USER_DETAIL}/${id}/`]);
  }
}
