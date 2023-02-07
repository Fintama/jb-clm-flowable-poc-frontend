import moment, { Moment } from 'moment';

// The unit of granularity of the date comparison functions we generate
// is day, NOT milliseconds
export const getDateRangeComparisonFn = (min: string | null, max: string | null) => {
  if (!min && !max) {
    // if both dates are false we assume the day satisfies the range
    return () => true;
  } else if (!min && max) {
    return (isoString: string) => moment(isoString).isSameOrBefore(min, 'day');
  } else if (min && !max) {
    return (isoString: string) => moment(isoString).isSameOrAfter(max, 'day');
  } else {
    // '[]' means that the dates are inclusive
    return (isoString: string) => moment(isoString).isBetween(min, max, 'day', '[]');
  }
};

export const formatDate = (date?: string | Date | null) =>
  date ? moment(date).format('DD.MM.YYYY') : '-';
export const formatDateAndTime = (date: string | Date) =>
  moment(date).isValid() ? moment(date).format('DD.MM.YYYY HH:mm') : '-';

export const getLatestDateISOString = (dates?: Moment[]) =>
  !!dates && !!dates.length ? moment.max(dates).toISOString() : undefined;

export const getLastestDateISOString = (dates?: Moment[]) =>
  !!dates && !!dates.length ? moment.min(dates).toISOString() : undefined;
