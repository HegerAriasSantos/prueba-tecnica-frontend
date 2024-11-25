import { Component } from '@angular/core';
import { Holiday } from '@core/models/holiday.model';
import { HolidayService } from '@core/services/holiday.service';
import { CrudActions } from '@shared/enums/crudActions.enum';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-holiday-list',
  templateUrl: './holiday-list.component.html',
  styleUrls: ['./holiday-list.component.scss'],
})
export class HolidayListComponent {
  holidays: Holiday[] = [];
  backups: Record<string, Holiday> = {};
  availablesHolidays: Holiday[] = [];
  search: string = '';
  constructor(private _holidayService: HolidayService) {}

  ngOnInit(): void {
    this.holidays = [...this._holidayService.getHolidays()];
    this.availablesHolidays = this.holidays;
  }
  searchHolidays() {
    console.log('this.search', this.search);
    if (this.search === '') {
      this.availablesHolidays = this.holidays;
      return;
    }
    this.availablesHolidays = this.holidays.filter((holiday) =>
      holiday.description.toLowerCase().includes(this.search.toLowerCase())
    );
  }

  enableEdit(holiday: Holiday) {
    holiday.isEdit = true;
    this.backups[holiday.id] = { ...holiday };
  }
  cancelChanges(holiday: Holiday) {
    holiday.isEdit = false;
    holiday.description = this.backups[holiday.id].description;
    holiday.date = this.backups[holiday.id].date;
    holiday.isRecurrent = this.backups[holiday.id].isRecurrent;
  }

  addRow() {
    const newHoliday = new Holiday('', '', new Date(), false);
    newHoliday.isEdit = true;
    this.holidays.push(newHoliday);
  }
  saveChange(holiday: Holiday) {
    if (holiday.id) this.updateHoliday(holiday);
    else this.createHoliday(holiday);
  }

  createHoliday(holiday: Holiday) {
    delete holiday.isEdit;
    this._holidayService.triggerActions({
      action: CrudActions.ADD,
      data: holiday,
    });
  }

  updateHoliday(holiday: Holiday) {
    delete holiday.isEdit;
    this._holidayService.triggerActions({
      action: CrudActions.UPDATE,
      data: holiday,
    });
  }

  deleteHoliday(holiday: Holiday) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (!result.isConfirmed) return;
      this._holidayService.triggerActions({
        action: CrudActions.DELETE,
        data: holiday,
      });
      this.holidays = this.holidays.filter((item) => item.id !== holiday.id);
      this.availablesHolidays = this.holidays;
    });
  }
}
