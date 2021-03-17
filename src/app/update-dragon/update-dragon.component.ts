import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup, ValidatorFn, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DragonsService } from '../dragons.service';
import { switchMap } from 'rxjs/operators';
import { Dragon } from 'src/Data/dragons';



@Component({
  selector: 'app-update-dragon',
  templateUrl: './update-dragon.component.html',
  styleUrls: ['./update-dragon.component.scss']
})
export class UpdateDragonComponent implements OnInit {
  dragonForm: FormGroup
  loadData: boolean = false


  constructor(private dS: DragonsService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.initForm();

 /*    this.route.params
      .subscribe(params => {
        this.loadData = true;
    const dragon=    this.dS.getOneDragon(params.id)
        this.dragonForm.patchValue(dragon); // hydrate le formulaire
        console.log("id dragon init: ", dragon);
      }
      ) */
  }

  initForm() {
    this.dragonForm = this.fb.group(
      {
        name: new FormControl("",
          Validators.required, // pour définir dans le controle un champ requis
        ),
      })
  }

  get name() { return this.dragonForm.get('name'); }


  onSubmit() {
    console.log("update")
    const dragon = this.dragonForm.value;
    console.log('id dragon: ', dragon.id)

    this.dS.updateDragon(dragon).subscribe(dragon => {
      this.router.navigate(['/dragons', { queryParams: { message: `${dragon.name} a bien été mis à jour` } }])
    },
      error => console.log(error))


  }

}
