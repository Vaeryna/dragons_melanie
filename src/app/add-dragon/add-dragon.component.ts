import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup, ValidatorFn, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { DragonsService } from '../dragons.service';


@Component({
  selector: 'app-add-dragon',
  templateUrl: './add-dragon.component.html',
  styleUrls: ['./add-dragon.component.scss']
})
export class AddDragonComponent implements OnInit {

  dragonForm: FormGroup

  constructor(
    private dS: DragonsService, private fb: FormBuilder, private router: Router
  ) { }

  ngOnInit(): void {
    this.dragonForm = this.fb.group(
      {
        name: new FormControl("", [Validators.required])
      }
    )
  }
  get name() { return this.dragonForm.get('name'); }

  onSubmit() {
    const dragon = this.dragonForm.value;

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
