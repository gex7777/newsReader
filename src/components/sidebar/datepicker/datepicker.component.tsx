import * as React from "react";
import TextField from "@material-ui/core/TextField";
import DateRangePicker, { DateRange } from "@material-ui/lab/DateRangePicker";
import AdapterDateFns from "@material-ui/lab/AdapterDateFns";
import LocalizationProvider from "@material-ui/lab/LocalizationProvider";
import Box from "@material-ui/core/Box";
import "./datepicker.styles.css";
import { useEffect } from "react";
interface props {
  filternews?: any;
}

export const BasicDateRangePicker: React.FC<props> = ({ filternews }) => {
  const [value, setValue] = React.useState<DateRange<Date>>([null, null]);
  useEffect(() => {
    console.log(value);
    if (value.every((e) => e !== null)) {
      filternews(value);
    }
  }, [value]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateRangePicker
        startText="Enter date range "
        endText=""
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(startProps, endProps) => (
          <React.Fragment>
            <TextField {...startProps} />
            <Box sx={{ mx: 2 }}> to </Box>
            <TextField {...endProps} />
          </React.Fragment>
        )}
      />
    </LocalizationProvider>
  );
};
