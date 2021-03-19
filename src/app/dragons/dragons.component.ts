import { Component, OnInit } from '@angular/core';
import { DragonsService } from '../dragons.service';
import { Dragon } from "../../Data/dragons"
import { environment as env } from "../../environments/environment"

import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { ActivatedRoute } from '@angular/router';

declare let $: any

@Component({
  selector: 'app-dragons',
  templateUrl: './dragons.component.html',
  styleUrls: ['./dragons.component.scss'],
  animations: [
    trigger('openClosed', [
      state('open', style({
        opacity: 1
      })),
      state('closed', style({
        opacity: 0,
        display: 'none',
        height: '0px'
      })),
      transition('open => closed', [animate('1s')])
    ])
  ]
})
export class DragonsComponent implements OnInit {
  dragons: Dragon[] = [];

  message: string | null = null;
  isOpen: boolean = false;
  idDelete: string | null = null;

  constructor(private dS: DragonsService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    //  this.dS.getDragon().subscribe(dragons => { this.dragons = dragons })
    this.dS.paginate(0, env.nb_dragon).subscribe(dragons => this.dragons = dragons)

    this.route.queryParams
      .subscribe((params: any) => {
        if (params.message) {
          this.message = params.message;
          this.isOpen = true;
          setTimeout(() => this.isOpen = false, 1000);
        }
      });


  }

  onDelete(id: string) {
    this.idDelete = id;
    console.log("onDelete", id)

  }

  confirmDelete() {
    if (this.idDelete) {
      console.log("idDelete", this.idDelete)
      this.dS.deleteDragon(this.idDelete).subscribe((a) => {
        this.message = 'success delete';
        this.isOpen = true;
        $("#modalDelete").modal('hide');
        window.location.reload()
        setTimeout(() => this.isOpen = false, 1000);
        this.idDelete = null;
      });
    }
  }

  paginateParent($event: { start: number, end: number }): void {
    const { start, end } = $event;

    this.dS.paginate(start, end).subscribe(dragons => this.dragons = dragons);
  }

  start() {
    this.dS.counter.next(true);
  }

  stop() {
    this.dS.counter.next(false);
  }

}

