import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { LocalStorageService } from '../shared/services/local-storage.service';
import { SharedModule } from '../shared/shared.module';
import { LangContainerComponent } from './components/lang-container/lang-container.component';
import { LanguageService } from './services/language.service';
import { TranslateGlService } from './services/translate-gl.service';

@NgModule({
  imports: [
    BrowserModule,
    FlexLayoutModule,
    SharedModule,
  ],
  declarations: [
    LangContainerComponent,
  ],
  providers: [
    LanguageService,
    TranslateGlService,
    LocalStorageService
  ],
  exports: [
    LangContainerComponent,
  ],
})
export class LanguageModule {}
