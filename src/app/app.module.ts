import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddDragonComponent } from './add-dragon/add-dragon.component';
import { DragonsComponent } from './dragons/dragons.component';


import { environment as env } from "../environments/environment"

import firebase from 'firebase';
import { UpdateDragonComponent } from './update-dragon/update-dragon.component';
import { DeleteDragonComponent } from './delete-dragon/delete-dragon.component';
import { DragonDetailsComponent } from './dragon-details/dragon-details.component';


firebase.initializeApp(env.firebaseConfig);

@NgModule({
  declarations: [
    AppComponent,
    AddDragonComponent,
    DragonsComponent,
    UpdateDragonComponent,
    DeleteDragonComponent,
    DragonDetailsComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
