import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TranslateGlService } from '../language/services/translate-gl.service';
import { DialogMessageService } from '../shared/services/dialog-message.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  errorMap: Map<string, boolean> = new Map();
  constructor(private dialogMessageService: DialogMessageService, private translateGlService: TranslateGlService){}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMsg = '';
          if (error.error instanceof ErrorEvent) {
            errorMsg = `Error: ${error.error.message}`;
            this.showErrorPopUp(error.error.message);
          }
          else {
            this.showErrorPopUp(error.message, error.status);
            errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
          }
          return EMPTY; //throwError(()=> new Error(errorMsg));
        })
      );
  }

  showErrorPopUp(msg: string, status?: number): void {
    const key = msg + (status !== undefined ? status : '');
    if (!this.errorMap.has(key)) {
      this.errorMap.set(key, true);
      const translateService = this.translateGlService.getInstance();
      let title = translateService.instant('ERROR.TITLE');
      if (status !== undefined) {
        title = `${title}: ${status}`;
      }
      const ok = translateService.instant('ERROR.OK');
      const dialogRef = this.dialogMessageService.create(this.dialogMessageService.getResultDialogMessageData(false, title, msg, ok), '650px');
      dialogRef.afterClosed().subscribe((_) => {
        this.errorMap.delete(key);
      });
    }
  }
}
