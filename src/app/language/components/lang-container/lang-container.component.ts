import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FlagStateEnum } from 'src/app/shared/enums/flag-state.enum';
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

  constructor(private translate: TranslateService, private languageService: LanguageService) {
    this.translate.addLangs(this.languageService.getLangIds());
    this.setLang(LanguageEnum.CZ);
  }

  trackByIdFn(_: any, item: Flag): any{
    return item.id;
  }

  setLang(id: string | LanguageEnum): void {
    this.languageService.setLanguage(id as LanguageEnum);

    this.flags = this.flags.map((flag) => ({
      ...flag,
      selected: flag.id === id,
    }));
  }

}
