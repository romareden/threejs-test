import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';

export interface UserPosition {
  user: string;
  position: Position;
}

export interface Position {
  x: number;
  y: number;
  z: number;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  apiUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  loadPosition(user: string): Observable<UserPosition> {
    return this.http.get<UserPosition>(this.apiUrl + user);
  }

  savePosition(userPosition: UserPosition): void {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    this.http.post(this.apiUrl, userPosition, httpOptions)
      .subscribe();
  }
}
