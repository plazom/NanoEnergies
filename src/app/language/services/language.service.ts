import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LanguageEnum } from '../enums/language.enum';

@Injectable()
export class LanguageService {
  currLang$ = new BehaviorSubject(LanguageEnum.NONE);
  constructor(){}

  getLanguage$(): BehaviorSubject<LanguageEnum> {
    return this.currLang$;
  }

  setLanguage(id: LanguageEnum): void {
    this.currLang$.next(id);
  }

  getLangIds(): LanguageEnum[] {
    return [LanguageEnum.EN, LanguageEnum.CZ];
  }
}
