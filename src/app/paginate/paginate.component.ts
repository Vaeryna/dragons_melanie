import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { environment } from '../../environments/environment'
import { DragonsService } from '../dragons.service';

@Component({
  selector: 'app-paginate',
  templateUrl: './paginate.component.html',
  styleUrls: ['./paginate.component.scss']
})
export class PaginateComponent implements OnInit {

  @Output() setPaginate: EventEmitter<{ start: number, end: number }> = new EventEmitter();


  pages: number[] = [];
  perPage: number = environment.nb_dragon;
  numberPages: number = 0;
  currentPage: number = 1;

  totalDragons: number = 10;

  constructor(private dS: DragonsService) { }

  ngOnInit(): void {
    this.dS.count().subscribe(total => {
      this.totalDragons = total;
      console.log(total);

      // arrondir au nombre entier supérieur 10/3 = 3.333...  Math.ceil(3.333) => 4
      this.numberPages = Math.ceil(this.totalDragons / this.perPage);

      for (let page = 1; page <= this.numberPages; page++) {
        this.pages.push(page);
      }


    });
  }


  next(): void {
    if (this.currentPage < this.numberPages) {
      this.currentPage++;
      this.paginate();
    }
  }

  previous(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginate();
    }
  }

  select(page: number): void {
    this.currentPage = page;
    this.paginate();
  }

  paginate() {
    const start = (this.currentPage - 1) * this.perPage;
    const end = start + this.perPage;

    this.setPaginate.emit({ start: start, end: end });
  }
}
