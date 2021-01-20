import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnterPhrasesComponent } from './components/enter-phrases/enter-phrases.component';
import { WritePhrasesComponent } from './components/write-phrases/write-phrases.component';
import { SetPasswordComponent } from './components/set-password/set-password.component';
import { FormsModule } from '@angular/forms';
import {RegisterRoutes } from './register.routing'
import { BrowserModule } from '@angular/platform-browser'

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    RegisterRoutes,
  ],
  declarations: [EnterPhrasesComponent, WritePhrasesComponent, SetPasswordComponent]
})
export class RegisterModule { }
