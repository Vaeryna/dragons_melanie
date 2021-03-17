import { Injectable } from '@angular/core';
import { Dragon } from 'src/Data/dragons';
import { DRAGONS } from 'src/Data/mock-dragon';

import { HttpClient, HttpHeaders } from '@angular/common/http'

import { map, switchMap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class DragonsService {

  constructor(private http: HttpClient) { }

  private dragons: Dragon[] = DRAGONS;

  private dragonUrl = "https://knight-dragons-default-rtdb.firebaseio.com/dragons";

  getDragon(): Observable<Dragon[]> {
    console.log("dragons: ", this.dragons);
    return this.http.get<Dragon[]>(this.dragonUrl + "/.json").pipe(
      map(a => { console.log("a:", a); return a })
    )
  }

  addDragon(dragon: Dragon): Observable<any>{
    return this.http.post<Dragon>(`${this.dragonUrl}/.json`, dragon)
  }

}
