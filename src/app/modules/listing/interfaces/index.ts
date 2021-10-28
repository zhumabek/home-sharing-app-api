import { BaseSortingFields, SortDirection } from '../../../utils/shared.types';

export interface ListingSortingFields extends BaseSortingFields {
  price?: SortDirection;
  numOfGuests?: SortDirection;
}
