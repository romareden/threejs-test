import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  nameKey = 'userName';

  constructor() { }

  getName(): string {
    const name = this.loadName();

    return name ? name : this.generateName();
  }

  loadName(): string | null {
    return localStorage.getItem(this.nameKey);
  }

  saveName(name: string): void {
    localStorage.setItem(this.nameKey, name);
  }

  generateName() {
    const name = `user${Date.now()}`;
    this.saveName(name);
    
    return name;
  }
}
