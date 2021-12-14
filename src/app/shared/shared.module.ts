import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonListComponent } from './components/button-list/button-list.component';
import { ButtonComponent } from './components/button/button.component';
import { DialogMessageComponent } from './components/dialog-message/dialog-message.component';
import { FlagComponent } from './components/flag/flag.component';
import { IconComponent } from './components/icon/icon.component';
import { TextComponent } from './components/text/text.component';
import { MaterialModule } from './material.module';

@NgModule({
  imports: [
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MaterialModule,
  ],
  providers: [
  ],
  declarations: [
    FlagComponent,
    DialogMessageComponent,
    IconComponent,
    ButtonComponent,
    ButtonListComponent,
    TextComponent,
  ],
  exports: [
    FlagComponent,
    DialogMessageComponent,
    IconComponent,
    ButtonComponent,
    ButtonListComponent,
    TextComponent
  ],
})
export class SharedModule {
}
