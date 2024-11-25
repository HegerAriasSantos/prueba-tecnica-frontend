import { CrudActions } from '@shared/enums/crudActions.enum';

export interface IPayload<T> {
  action: CrudActions;
  data: T;
}
