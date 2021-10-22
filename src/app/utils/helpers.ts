import * as moment from 'moment';
import { DATE_FORMAT } from './constants';

export const formatDate = (date: Date, format = DATE_FORMAT): string => {
  return moment(date).format(format);
};
