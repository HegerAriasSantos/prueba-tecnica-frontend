import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HolidayModule } from '@modules/holiday/holiday.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HolidayModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
