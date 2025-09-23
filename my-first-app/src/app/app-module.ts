import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { App } from './app';
import { Server } from './server/server';
import { Servers } from './servers/servers';
import { Warning } from './warning/warning';
import { Success } from './success/success';

@NgModule({
  declarations: [
    App,
    Server,
    Servers,
    Warning,
    Success
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [App]
})
export class AppModule { }
