import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dragon } from 'src/Data/dragons';
import { DragonsService } from '../dragons.service';
import { map, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-dragon-details',
  templateUrl: './dragon-details.component.html',
  styleUrls: ['./dragon-details.component.scss']
})
export class DragonDetailsComponent implements OnInit {
  dragon: Dragon | null = null;
  constructor(private dS: DragonsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id, 'id');

    if (id)
      this.dS.getOneDragon(id)
        .subscribe((dragon) => { this.dragon = dragon; console.log("dragon: , ", dragon) });
  };
}

