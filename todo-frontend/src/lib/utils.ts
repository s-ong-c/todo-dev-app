import format from 'date-fns/format';

export function isValidateInput(val: string) {
  return !/[$&+,:;=?#|'<>^*%!]/g.test(val);
}
export const formatDate = (date: string): string => {
  const time = new Date(date);
  return format(time, 'yyyy- M-d');
};
