import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LoadDataAction } from 'src/app/store/actions/task.actions';
import { getTaskData } from 'src/app/store/selectors/task.selector';
import { IAppState } from 'src/app/store/state/app.state';

@Injectable()
export class TaskService {
  constructor(private store: Store<IAppState>){}

  getTaskData$(): Observable<any> {
    return this.store.select(getTaskData);
  }

  LoadTaskData(data: any): void {
    this.store.dispatch(new LoadDataAction(data));
  }

}
