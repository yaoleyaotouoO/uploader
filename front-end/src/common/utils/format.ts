import moment from 'moment';

export const dateTimeText = (f: string | moment.Moment | Date, dateOnly = false) => {
  return f ? moment(f).format(dateOnly ? 'MM/DD/YYYY' : 'MM/DD/YYYY HH:mm:ss') : '';
};

export const formatPhone = (phone: string) => {
  if (/^\d{10}$/.test(phone)) {
    return phone.replace(/^(\d{3})(\d{3})(\d{4})$/, '($1) $2-$3');
  }
  if (/^\d{11,20}$/.test(phone)) {
    return phone.replace(/^(\d{3})(\d{3})(\d{4})(\d{1,10})$/, '($1) $2-$3-$4');
  }
  return phone;
};

export const formatCurrentAge = (birthDate: string) => {
  return birthDate ? moment().diff(birthDate, 'years', false) : '';
};

export const addLocalTimeZone = (time: string | moment.Moment | Date) => {
  return time && `${time}Z`;
};