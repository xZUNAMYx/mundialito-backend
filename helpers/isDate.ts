import { isValid } from 'date-fns';
     //Se hizo con date-fns en vez del del tutorial
const isDate = (dateValue: any, res: any) => {
  if (!dateValue) return false;
 
  const date = isValid(dateValue); // retorna true o false
  return date;
};
 
module.exports = {
  isDate
} 