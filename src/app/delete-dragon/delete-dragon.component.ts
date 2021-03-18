import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup, ValidatorFn, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DragonsService } from '../dragons.service';
import { switchMap } from 'rxjs/operators';
import { Dragon } from 'src/Data/dragons';


@Component({
  selector: 'app-delete-dragon',
  templateUrl: './delete-dragon.component.html',
  styleUrls: ['./delete-dragon.component.scss']
})
export class DeleteDragonComponent implements OnInit {
  dragonForm: FormGroup
  loadData: boolean = false
  dragon: Dragon


  constructor(private dS: DragonsService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.dragonForm = this.fb.group(
      {
        name: new FormControl("",
          Validators.required, // pour définir dans le controle un champ requis
        ),
      })

    const id = this.route.snapshot.paramMap.get('id');
    if (id)
      this.dS.getOneDragon(id)
        .subscribe((dragon) => { this.dragon = dragon; console.log("dragon: ,", dragon) });
  }

  get name() { return this.dragonForm.get('name'); }


  onSubmit() {
    console.log("update")
    const dragon = this.dragonForm.value;
    console.log('id dragon: ', dragon.id)

    this.dS.deleteDragon(dragon).subscribe(dragon => {
      this.router.navigate(['/dragons', { queryParams: { message: `${dragon.name} a bien été mis à jour` } }])
    },
      error => console.log(error))


  }

}
