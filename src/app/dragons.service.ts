import { Injectable } from '@angular/core';
import { Dragon } from 'src/Data/dragons';

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
      map(a => { return a })
    )
  }

  getOneDragon(id: string): Observable<any> {
    //   return this.http.get<Dragon>(`${this.dragonUrl}/${id}/.json`)

    return this.http.get<Dragon>(`${this.dragonUrl}/${id}/.json`).pipe(
      map(a => { return a })
    )

  }

  addDragon(dragon: Dragon): Observable<any> {
    return this.http.post<Dragon>(`${this.dragonUrl}/.json`, dragon).pipe(
      switchMap(ref => {
        dragon.id = ref.name;
        return this.http.put<void>(`${this.dragonUrl}/${ref.name}/.json`, dragon)
      })
    )

  }

  updateDragon(dragon: Dragon): Observable<any> {
    return this.http.put<Dragon>(`${this.dragonUrl}/${dragon.id}/.json`, dragon)

  }

  deleteDragon(id: string): Observable<any> {
    console.log("delete id", id)
    return this.http.delete<any>(`${this.dragonUrl}/${id}/.json`)


  }


}
