import { BaseSortingFields, SortDirection } from '../../../utils/shared.types';

export interface UserSortingFields extends BaseSortingFields {
  firstName?: SortDirection;
  lastName?: SortDirection;
  email?: SortDirection;
}
