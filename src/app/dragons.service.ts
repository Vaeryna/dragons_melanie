import { Injectable } from '@angular/core';
import { Dragon } from 'src/Data/dragons';

import { HttpClient, HttpHeaders } from '@angular/common/http'

import { map, switchMap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Element } from 'src/Data/element';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class DragonsService {

  elements: Element[];

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  private dragonUrl = "https://knight-dragons-default-rtdb.firebaseio.com/dragons";
  private countUrl = "https://knight-dragons-default-rtdb.firebaseio.com/count";
  private elementUrl = "https://knight-dragons-default-rtdb.firebaseio.com/elements";

  counter: Subject<boolean> = new Subject<boolean>();


  getDragon(): Observable<Dragon[]> {
    return this.http.get<Dragon[]>(this.dragonUrl + "/.json").pipe(
      map(dragons => Object.values(dragons)),
      map(a => { return a })
    )
  }

  getElement(): Observable<Element[]> {
    console.log("get element")
    return this.http.get<Element[]>(this.elementUrl + "/.json").pipe(
      map(elements => Object.values(elements)),
      map(a => { console.log(a); return a })
    )
  };

  getOneElement(id: string): Observable<any> {
    return this.http.get<Element>(`${this.elementUrl}/ ${id} /.json}`).pipe(
      map(a => { return a })
    )
  }

  getOneDragon(id: string): Observable<any> {
    //   return this.http.get<Dragon>(`${ this.dragonUrl } /${id}/.json`)

    return this.http.get<Dragon>(`${this.dragonUrl} /${id}/.json`).pipe(
      map(a => { return a })
    )

  }

  addDragon(dragon: Dragon): Observable<any> {
    return this.http.post<Dragon>(`${this.dragonUrl} /.json`, dragon).pipe(
      switchMap(ref => {
        dragon.id = ref.name
          ; console.log("ref:", ref)
        /*    if (element) {
          //   dragon.element = element
             console.log("element dargon", element) */

        return this.http.put<void>(`${this.dragonUrl}/${ref.name}/.json`, dragon).pipe(
          switchMap(ref => this.incrementCount())
        )
      })
    )

  }

  updateDragon(dragon: Dragon): Observable<any> {
    return this.http.put<Dragon>(`${this.dragonUrl}/${dragon.id}/.json`, dragon)

  }

  deleteDragon(id: string): Observable<any> {
    console.log("delete id", id)
    return this.http.delete<any>(`${this.dragonUrl}/${id}/.json`).pipe(
      switchMap(ref => this.decrementCount())
    )


  }

  paginate(start: number, end: number): Observable<Dragon[]> {
    return this.http.get<Dragon[]>(this.dragonUrl + '/.json').pipe(
      // Pour appliquer un pipe permettant de récupérer les données firebase dans un Array JS
      map(dragons => Object.values(dragons)),
      map(dragons => dragons
        //     .sort((x, y) => x.duration - y.duration)  => rangement alphabetique à voir
        .slice(start, end))
    )
  }

  count(): Observable<number> {
    return this.http.get<number>(this.countUrl + '/.json');

  }
  incrementCount(): Observable<any> {
    return this.http.get<number>(`${this.countUrl}/.json`).pipe(
      switchMap(count => this.http.put<void>(`${this.countUrl}/.json`, count + 1))
    )
  }
  decrementCount(): Observable<any> {
    return this.http.get<number>(`${this.countUrl}/.json`).pipe(
      switchMap(count => this.http.put<void>(`${this.countUrl}/.json`, count - 1))
    )
  }

}
