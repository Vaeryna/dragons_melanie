import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddDragonComponent } from './add-dragon/add-dragon.component';
import { DragonsComponent } from './dragons/dragons.component';

const routes: Routes = [
  {
    path: 'dragons',
    component: DragonsComponent
  },
  {
    path: '',
    redirectTo: "/dragons",
    pathMatch: "full"
  },
  {
    path: 'addDragon',
    component: AddDragonComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
