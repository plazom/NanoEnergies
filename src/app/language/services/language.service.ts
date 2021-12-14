import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { objectToArray } from 'src/app/shared/utils/transform-util';
import { SetLanguageAction } from 'src/app/store/actions/config.actions';
import { getLanguage } from 'src/app/store/selectors/config.selector';
import { IAppState } from 'src/app/store/state/app.state';
import { LanguageEnum } from '../enums/language.enum';

@Injectable()
export class LanguageService {
  constructor(private store: Store<IAppState>){}

  getLanguage$(): Observable<LanguageEnum> {
    return this.store.select(getLanguage);
  }

  setLanguage(id: LanguageEnum): void {
    this.store.dispatch(new SetLanguageAction(id));
  }

  getLangIds(): LanguageEnum[] {
    return (objectToArray(LanguageEnum) as LanguageEnum[]).filter(value => value !== LanguageEnum.NONE);
  }
}
