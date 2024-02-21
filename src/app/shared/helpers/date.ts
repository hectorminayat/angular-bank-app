export const compareDates = (minorDate: Date = new Date(), majorDate: Date = new Date()): boolean => {

  minorDate.setHours(0,0,0,0);
  majorDate.setHours(0,0,0,0);

  return majorDate.getTime() >= minorDate.getTime()
}