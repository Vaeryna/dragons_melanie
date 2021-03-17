import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddDragonComponent } from './add-dragon/add-dragon.component';
import { DeleteDragonComponent } from './delete-dragon/delete-dragon.component';
import { DragonDetailsComponent } from './dragon-details/dragon-details.component';
import { DragonsComponent } from './dragons/dragons.component';
import { UpdateDragonComponent } from './update-dragon/update-dragon.component';

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
  },
  {
    path: 'update/dragon/:id',
    component: UpdateDragonComponent
  },
  {
    path: 'delete/dragon/:id',
    component: DeleteDragonComponent
  },
  {
    path: 'dragons/:id',
    component: DragonDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
