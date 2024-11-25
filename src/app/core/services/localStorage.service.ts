import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}
  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
  getItem(key: string): string | null {
    const item = localStorage.getItem(key);
    if (item === null) return null;
    return JSON.parse(item);
  }
  removeItem(key: string): void {
    localStorage.removeItem(key);
  }
  clear(): void {
    localStorage.clear();
  }
}
