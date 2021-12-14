import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { LanguageEnum } from '../../language/enums/language.enum';
import { TranslateGlService } from '../../language/services/translate-gl.service';
import { EConfigActions, SetLanguageAction, SetLanguageSuccessAction } from '../actions/config.actions';


@Injectable()
export class ConfigEffects {

  setLanguage$ = createEffect( () => this._actions$.pipe(
    ofType<SetLanguageAction>(EConfigActions.SetLanguage),
    switchMap((action) => {
      return this.translateService.use(action.payload);
    }),
    switchMap((lang: LanguageEnum) => {
      return of(new SetLanguageSuccessAction(lang));
    })
  ));

  constructor(
    private translateService: TranslateGlService,
    private _actions$: Actions) {}
}
