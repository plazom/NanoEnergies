import { Injectable } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { combineLatest, Observable, of, Subject, Subscription } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { LocalStorageKeysEnum } from 'src/app/shared/enums/local-storage-keys.enum';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { LanguageEnum } from '../enums/language.enum';
import { ModuleTypeEnum } from '../enums/module-type.enum';
import { LanguageService } from './language.service';

@Injectable()
export class TranslateGlService {
  private translateDataMap: Map<ModuleTypeEnum, {translateService: TranslateService, subscription: Subscription}> = new Map();

  constructor(private languageService: LanguageService, private localStorageService: LocalStorageService) {
  }

  getInstance(type: ModuleTypeEnum = ModuleTypeEnum.GLOBAL): TranslateService {
    return this.translateDataMap.get(type)?.translateService as TranslateService;
  }

  setInstance(service: TranslateService, type: ModuleTypeEnum = ModuleTypeEnum.GLOBAL): Subject<boolean> {
    const instanceLoaded$: Subject<boolean> = new Subject();
    const subscription = new Subscription();
    this.translateDataMap.set(type, {translateService: service, subscription});
      subscription.add(
        this.languageService.getLanguage$().subscribe((value: LanguageEnum) => {
          value = value !== LanguageEnum.NONE ? value : (this.localStorageService.getItem(LocalStorageKeysEnum.LANGUAGE) as LanguageEnum || LanguageEnum.CZ);
          if (service.currentLang === value){
            setTimeout(() => {
              instanceLoaded$.next(true);
            }, 0);
          } else {
            this.use(value).pipe(take(1)).subscribe(_ => {
              instanceLoaded$.next(true);
            });
          }
        })
      );
    return instanceLoaded$;
  }

  removeInstance(type: ModuleTypeEnum): void {
    this.translateDataMap.get(type)?.subscription.unsubscribe();
    this.translateDataMap.delete(type);
  }

  use(lng: LanguageEnum): Observable<LanguageEnum> {
    return combineLatest(
        [...this.translateDataMap.values()].filter(translateData => translateData.translateService.currentLang !== lng).map(translateData => {
          return translateData.translateService.use(lng);
        })
      ).pipe(
        switchMap(_ => {
          return of(lng);
      }));
  }
}
