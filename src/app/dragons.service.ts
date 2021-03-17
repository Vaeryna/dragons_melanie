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



  private dragonUrl = "https://knight-dragons-default-rtdb.firebaseio.com/dragons";

  getDragon(): Observable<Dragon[]> {
    return this.http.get<Dragon[]>(this.dragonUrl + "/.json").pipe(
      map(dragons => Object.values(dragons)),
      map(a => { console.log("dragons:", a); return a })
    )
  }

  getOneDragon(id: string): Observable<any> {
    //   return this.http.get<Dragon>(`${this.dragonUrl}/${id}/.json`)

    return this.http.get<Dragon>(`${this.dragonUrl}/${id}/.json`).pipe(
      map(dragons => Object.values(dragons)),
      map(a => { console.log("getOnedragons:", a); return a })
    )

  }

  addDragon(dragon: Dragon): Observable<any> {
    return this.http.post<Dragon>(`${this.dragonUrl}/.json`, dragon)

  }

  updateDragon(dragon: Dragon): Observable<any> {
    return this.http.put<Dragon>(`${this.dragonUrl}/${dragon.id}/.json`, dragon)
  }
}
