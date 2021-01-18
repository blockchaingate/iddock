import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnterPhrasesComponent } from './components/enter-phrases/enter-phrases.component';
import {RegisterRoutes } from './register.routing'

@NgModule({
  imports: [
    CommonModule,
    RegisterRoutes,
  ],
  declarations: [EnterPhrasesComponent]
})
export class RegisterModule { }
