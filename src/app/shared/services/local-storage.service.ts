import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageStoreService {

  constructor() { }

  public get storage(): Storage {
    return localStorage;
  }

  public cleanAll(): any {
    const { storage } = this;
    return storage.clear();
  }

  public getItem(key: string): any {
    const { storage } = this;
    const currentStorage = storage.getItem(key);
    return currentStorage ? currentStorage : '';
  }

  public setItem(key: string, value: string): any {
    const { storage } = this;
    return storage.setItem(key, value);
  }

  public removeItem(key: string): any {
    const { storage } = this;
    return storage.removeItem(key);
  }
}
