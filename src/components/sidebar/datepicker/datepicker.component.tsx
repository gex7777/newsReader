import * as React from "react";
import { DateRange } from "@material-ui/lab/DateRangePicker";
import AdapterDateFns from "@material-ui/lab/AdapterDateFns";
import LocalizationProvider from "@material-ui/lab/LocalizationProvider";
import { useEffect } from "react";
import { DatePicker } from "antd";
import moment from "moment";
import "./datepicker.styles.css";
import "antd/dist/antd.css";
const { RangePicker } = DatePicker;
interface props {
  filternews?: any;
}

export const BasicDateRangePicker: React.FC<props> = ({ filternews }) => {
  const [value, setValue] = React.useState<DateRange<Date>>([null, null]);
  useEffect(() => {
    filternews(value);
    // eslint-disable-next-line
  }, [value]);
  function onChange(dates: any) {
    if (dates === null) {
      setValue([null, null]);
      return;
    }
    setValue([moment(dates[0]).toDate(), moment(dates[1]).toDate()]);
  }
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <RangePicker
        style={{ width: "100%" }}
        ranges={{
          Today: [moment(), moment()],
          "This Month": [moment().startOf("month"), moment().endOf("month")],
        }}
        onChange={onChange}
      />
    </LocalizationProvider>
  );
};
