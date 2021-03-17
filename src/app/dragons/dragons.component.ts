import { Component, OnInit } from '@angular/core';
import { DragonsService } from '../dragons.service';
import { Dragon } from "../../Data/dragons"

@Component({
  selector: 'app-dragons',
  templateUrl: './dragons.component.html',
  styleUrls: ['./dragons.component.scss']
})
export class DragonsComponent implements OnInit {
  dragons: Dragon[] = [];

  constructor(private dS: DragonsService) {

  }

  ngOnInit(): void {
    console.log("dragons work !")
    this.dS.getDragon().subscribe(dragons => this.dragons = dragons)

  }

}
