import { Injectable } from '@angular/core';
import { Holiday } from '@core/models/holiday.model';
import { LocalStorageService } from '@core/services/localStorage.service';
import { IPayload } from '@shared/models/payload';
import { CrudActions } from '@shared/enums/crudActions.enum';
import { ObjectUtils } from '@shared/utils/object.utils';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class HolidayService {
  private holidays: Holiday[] = [];
  private triggerActions$ = new Subject<IPayload<Holiday>>();
  private nextId = 1;

  constructor(private _localStorageService: LocalStorageService) {
    this.updateAllHolidays();
    this.hearActions();
  }

  triggerActions(payload: IPayload<Holiday>): void {
    this.triggerActions$.next(payload);
  }
  private hearActions(): void {
    this.triggerActions$.subscribe((action) => {
      if (action.action === CrudActions.ADD) {
        this.addHoliday(action.data);
      } else if (action.action === CrudActions.UPDATE) {
        this.updateHoliday(action.data);
      } else if (action.action === CrudActions.DELETE) {
        this.deleteHoliday(action.data.id);
      }
      this.updateAllHolidays();
    });
  }

  private updateAllHolidays(): void {
    this.holidays = this.getAllHoliday();
    this.nextId = this.holidays.length + 1;
  }

  private addHoliday(holiday: Holiday) {
    holiday.id = this.nextId.toString();
    this.holidays.push(holiday);
    this._localStorageService.setItem(
      'holidays',
      JSON.stringify(this.holidays)
    );
    Swal.fire({
      icon: 'success',
      title: 'Holiday added successfully',
      showConfirmButton: false,
      timer: 1000,
    });
  }

  private getAllHoliday() {
    const holidaysString = this._localStorageService.getItem('holidays');
    const holidays: Holiday[] = holidaysString
      ? JSON.parse(holidaysString)
      : [];
    return holidays;
  }

  private updateHoliday(updatedHoliday: Partial<Holiday>): void {
    const index = this.holidays.findIndex(
      (holiday) => holiday.id === updatedHoliday.id
    );
    if (index === -1) return;

    this.holidays[index] = ObjectUtils.updateFromPartial(
      this.holidays[index],
      updatedHoliday
    );
    this._localStorageService.setItem(
      'holidays',
      JSON.stringify(this.holidays)
    );

    Swal.fire({
      icon: 'success',
      title: 'Holiday updated successfully',
      showConfirmButton: false,
      timer: 1000,
    });
  }

  private deleteHoliday(id: string): void {
    const newHolidays = this.getAllHoliday().filter(
      (holiday) => holiday.id !== id
    );
    this._localStorageService.setItem('holidays', JSON.stringify(newHolidays));

    Swal.fire({
      icon: 'success',
      title: 'Holiday deleted successfully',
      showConfirmButton: false,
      timer: 1000,
    });
  }
  getHolidays() {
    return this.holidays;
  }
}
