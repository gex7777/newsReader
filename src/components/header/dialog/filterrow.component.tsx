import {
  Autocomplete,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@material-ui/core";
import { useState } from "react";
import { Categories } from "../../../api/fetchCategories";

import { fetchSources, Source } from "../../../api/fetchSources";
import { fetchCatogories } from "./../../../api/fetchCategories";
interface Sentiments {
  sentiment: string;
}
interface Default {
  default: string;
}
const sentiments = [
  {
    sentiment: "Postive",
  },
  {
    sentiment: "Negative",
  },
  {
    sentiment: "Neutral",
  },
];
type optiontypes = Categories[] | Source[] | Sentiments[] | Default;
interface props {
  callback?: any;
}
export const FilterRow: React.FC<props> = ({ callback }) => {
  const [options, setoptions] = useState<any>([{ default: "" }]);
  const [selectedValues, setSelectedValues] = useState<any>([]);
  const handleOptions = (e: SelectChangeEvent) => {
    console.log(e.target.value);
    switch (e.target.value.toString()) {
      case "20":
        fetchSources().then((res) => setoptions(res));
        break;
      case "10":
        fetchCatogories().then((res) => setoptions(res));
        break;
      case "30":
        setoptions(sentiments);
    }
  };
  return (
    <Box
      noValidate
      component="form"
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingBottom: "20px",
      }}
    >
      <FormControl style={{ minWidth: 120 }}>
        <InputLabel id="demo-simple-select-label">Filter</InputLabel>
        <Select label="filter" id="demo-simple-select" onChange={handleOptions}>
          <MenuItem value={10}>Category</MenuItem>
          <MenuItem value={20}>Source</MenuItem>
          <MenuItem value={30}>Sentiment</MenuItem>
        </Select>
      </FormControl>
      {(() => {
        if ("category" in options[0]) {
          return (
            <Autocomplete
              onChange={(event, value) => callback({ categories: value })}
              style={{ minWidth: 600 }}
              multiple
              id="tags-standard"
              options={options}
              getOptionLabel={(option: Categories) => option.category}
              renderInput={(params) => (
                <TextField {...params} variant="standard" />
              )}
            />
          );
        } else if ("name" in options[0]) {
          return (
            <Autocomplete
              onChange={(event, value) => callback({ sources: value })}
              style={{ minWidth: 600 }}
              multiple
              id="tags-standard"
              options={options}
              getOptionLabel={(option: Source) => option.name}
              renderInput={(params) => (
                <TextField {...params} variant="standard" />
              )}
            />
          );
        } else if ("sentiment" in options[0]) {
          return (
            <Autocomplete
              onChange={(event, value) => callback({ sentiments: value })}
              style={{ minWidth: 600 }}
              multiple
              id="tags-standard"
              options={options}
              getOptionLabel={(option: Sentiments) => option.sentiment}
              renderInput={(params) => (
                <TextField {...params} variant="standard" />
              )}
            />
          );
        }
        return (
          <Autocomplete
            style={{ minWidth: 600 }}
            multiple
            id="tags-standard"
            options={options}
            getOptionLabel={(option: Default) => option.default}
            renderInput={(params) => (
              <TextField {...params} variant="standard" />
            )}
          />
        );
      })()}
    </Box>
  );
};
