import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HolidayListComponent } from '@modules/holiday/components/holiday-list/holiday-list.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [HolidayListComponent],
  imports: [CommonModule, FormsModule],
  exports: [HolidayListComponent, FormsModule],
})
export class HolidayModule {}
