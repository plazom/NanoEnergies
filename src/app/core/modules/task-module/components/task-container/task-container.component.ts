import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';
import { IUserResponse } from 'src/app/api/interfaces/user-response.interface';
import { IUsersResponse } from 'src/app/api/interfaces/users-response.interface';
import { ModuleTypeEnum } from 'src/app/language/enums/module-type.enum';
import { LanguageService } from 'src/app/language/services/language.service';
import { TranslateGlService } from 'src/app/language/services/translate-gl.service';
import { BaseContainerDirective } from 'src/app/shared/directives/base-container.directive';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'ne-task-container',
  templateUrl: './task-container.component.html',
  styleUrls: ['./task-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskContainerComponent extends BaseContainerDirective {
  protected moduleType: ModuleTypeEnum;
  usersResponse?: IUsersResponse;

  constructor(protected translateGlService: TranslateGlService, protected translateService: TranslateService,
    protected  languageService: LanguageService, protected cdr: ChangeDetectorRef, private taskService: TaskService) {
    super();
    this.moduleType = ModuleTypeEnum.TASK;
  }

  override ngOnInit(): void {
      super.ngOnInit();
      this.taskService.getTaskData$().subscribe(data => {
         this.usersResponse = data;
         this.cdr.markForCheck();
      })
      this.taskService.loadTaskData(0);
  }

  trackByIdFn(_: any, item: IUserResponse): any{
    return item.id;
  }

  getUsers(): Array<IUserResponse>{
    return this.usersResponse?.data ? this.usersResponse.data : [];
  }

  onChangePage(event: PageEvent): void {
    this.taskService.loadTaskData(event.pageIndex+1);
  }

  getTotalItems(): number {
    return this.usersResponse?.total || 0;
  }

  getPageIndex(): number {
    return this.usersResponse?.page ? this.usersResponse.page - 1 : 0;
  }

  getPageSize(): number {
    return this.usersResponse?.per_page || 5;
  }

}
