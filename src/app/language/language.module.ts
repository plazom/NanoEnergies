import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '../shared/shared.module';
import { LangContainerComponent } from './components/lang-container/lang-container.component';
import { LanguageService } from './services/language.service';

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
    LanguageService
  ],
  exports: [
    LangContainerComponent,
  ],
})
export class LanguageModule {}
