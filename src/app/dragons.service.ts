import { Injectable } from '@angular/core';
import { Dragon } from 'src/Data/dragons';
import { DRAGONS } from 'src/Data/mock-dragon';

import { HttpClient, HttpHeaders } from '@angular/common/http'

import { map, switchMap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class DragonsService {

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

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
      map(a => { console.log("getOnedragons:", a); return a })
    )

  }

  addDragon(dragon: Dragon): Observable<any> {
    return this.http.post<Dragon>(`${this.dragonUrl}/.json`, dragon).pipe(
      switchMap(ref => {
        dragon.id = ref.name;
        console.log("ref.name : ", ref)
        return this.http.put<void>(`${this.dragonUrl}/${ref.name}/.json`, dragon)
      })
    )

  }

  updateDragon(dragon: Dragon): Observable<any> {
    return this.http.put<Dragon>(`${this.dragonUrl}/${dragon.id}/.json`, dragon).pipe(
      switchMap(() => { 
        console.log("dragon service: ", dragon)
        console.log("id service", dragon.id)
        /* switchMap(ref => {
          dragon.id = dragon.name;
          console.log("ref.name : ", ref);
          console.log('dragon.id', dragon.id) */
        return this.http.put<void>(`${this.dragonUrl}/${dragon.id}/.json`, dragon)
      })
    )
  }

  deleteDragon(dragon: Dragon): Observable<any> {
    return this.http.delete<Dragon>(`${this.dragonUrl}/${dragon.id}/.json`).pipe(
      switchMap(ref => {
        dragon.id = ref.name;
        console.log("ref.name : ", ref);
        console.log('dragon.id', dragon.id)
        return this.http.put<void>(`${this.dragonUrl}/${ref.name}/.json`, dragon)
      })
    )
  }


}
