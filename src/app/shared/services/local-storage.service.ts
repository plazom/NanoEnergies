import { Injectable } from '@angular/core';
import { LocalStorageKeysEnum } from '../enums/local-storage-keys.enum';

@Injectable()
export class LocalStorageService {
   setItem(key: LocalStorageKeysEnum, value: string): void {
      if (key) {
         localStorage.setItem(key, value);
      }
   }

   getItem(key: LocalStorageKeysEnum): string | null {
      return localStorage.getItem(key);

   }

   removeItem(key: LocalStorageKeysEnum): void {
      if (key) {
         localStorage.removeItem(key);
      }
   }

   clearAll(): void {
      localStorage.clear();
   }

}
