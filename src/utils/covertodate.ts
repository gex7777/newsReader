import moment from "moment";
import { Datum } from "../api/fetchNews";

export const convertDates = (obj: Datum[]) => {
  const updatedobj = obj.map((item) => ({
    ...item,
    date: moment(item.date).format("LL"),
  }));
  return updatedobj;
};
