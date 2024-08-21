export const formatDateToMonthYear = (date: Date, locale?: string): string => {
  const dateObject = new Date(date);

  // Check if the date is valid
  if (isNaN(dateObject.getTime())) return '';

  return new Intl.DateTimeFormat(locale, {
    dateStyle: 'full',
  })
    .formatToParts(new Date(date))
    .filter((part) => part?.type === 'month' || part?.type === 'year')
    .map((part) => part.value)
    .join(', ');
};

export const formatDateToLocale = (date: Date, locale?: string): string => {
  const dateObject = new Date(date);

  // Check if the date is valid
  if (isNaN(dateObject.getTime())) return '';

  return new Date(date).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const addOneMonth = (dateString: string, locale?: string): string => {
  const date = new Date(dateString);
  date.setMonth(date.getMonth() + 1);

  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const addMonthsFormatString = (
  dateString: string,
  months: number,
  locale?: string,
): string => {
  const date = new Date(dateString);
  date.setMonth(date.getMonth() + months);

  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const addMonthsFormatDate = (
  dateString: string,
  months: number,
): Date => {
  const date = new Date(dateString);
  date.setMonth(date.getMonth() + months);

  return date;
};

export const addDaysToDate = (dateString: string, daysToAdd: number): Date => {
  const date = new Date(dateString);

  date.setDate(date.getDate() + daysToAdd);

  // Reset time to avoid carrying over time components
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};
