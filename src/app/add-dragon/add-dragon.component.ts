import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup, ValidatorFn, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { DragonsService } from '../dragons.service';
import { Element } from '../../Data/element'
import { map, switchMap } from 'rxjs/operators';
import { element } from 'protractor';



@Component({
  selector: 'app-add-dragon',
  templateUrl: './add-dragon.component.html',
  styleUrls: ['./add-dragon.component.scss']
})
export class AddDragonComponent implements OnInit {

  dragonForm: FormGroup
  elements: Element[]

  constructor(
    private dS: DragonsService, private fb: FormBuilder, private router: Router
  ) {
  }


  ngOnInit(): void {
    this.dS.getElement().subscribe(elements => { this.elements = elements; console.log("element:", elements) })

    this.dragonForm = this.fb.group(
      {
        name: new FormControl("", [Validators.required]),
        element: new FormControl("", [])

      }
    )


  }
  get name() { return this.dragonForm.get('name'); }
  get element() { return this.dragonForm.get('element') }


  onSubmit() {
    const dragon = this.dragonForm.value;
    console.log("dragon submit", dragon)


     this.dS.addDragon(dragon).subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/dragons', { queryParams: "Dragon ajouté avec succès" }])
      },
      error => {
        console.log(error);
      },
      () => console.log('Completé"')
    )


  }
}
