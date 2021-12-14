import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageKeysEnum } from 'src/app/shared/enums/local-storage-keys.enum';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { Flag } from '../../../shared/types/flag.type';
import { LanguageEnum } from '../../enums/language.enum';
import { LanguageService } from '../../services/language.service';
@Component({
  selector: 'ne-lang-container',
  templateUrl: './lang-container.component.html',
  styleUrls: ['./lang-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LangContainerComponent {
  @Input() flags: Array<Flag> = [
    {
      id: LanguageEnum.CZ,
      imgUp: 'assets/imgs/czech_republic_round_icon_64.png',
      imgDown: 'assets/imgs/czech_republic_heart_icon_64.png',
      selected: false,
    },
    {
      id: LanguageEnum.EN,
      imgUp: 'assets/imgs/united_kingdom_round_icon_64.png',
      imgDown: 'assets/imgs/united_kingdom_heart_icon_64.png',
      selected: false,
    },
  ];

  constructor(private translate: TranslateService, private languageService: LanguageService, private localStorageService: LocalStorageService) {
    this.translate.addLangs(this.languageService.getLangIds());
    const lang = this.localStorageService.getItem(LocalStorageKeysEnum.LANGUAGE);
    this.setLang(lang || LanguageEnum.CZ);
  }

  trackByIdFn(_: any, item: Flag): any{
    return item.id;
  }

  setLang(id: string | LanguageEnum): void {
    this.localStorageService.setItem(LocalStorageKeysEnum.LANGUAGE, id);
    this.languageService.setLanguage(id as LanguageEnum);

    this.flags = this.flags.map((flag) => ({
      ...flag,
      selected: flag.id === id,
    }));
  }

}
