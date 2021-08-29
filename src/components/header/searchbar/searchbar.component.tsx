import { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";

import SearchIcon from "@material-ui/icons/Search";

interface props {
  searchValue?: any;
}
const searchValueFromLocalStorage = localStorage.getItem("searchValue") || "";

export const SearchBar: React.FC<props> = ({ searchValue }) => {
  const [value, setvalue] = useState(searchValueFromLocalStorage);

  useEffect(() => {
    searchValue(value);
    localStorage.setItem("searchValue", value);
    // eslint-disable-next-line
  }, [value]);
  const submitForSearch = (e: React.KeyboardEvent) => {
    if (e.keyCode === 13) {
      searchValue(value);
    }
  };
  return (
    <TextField
      label="search"
      value={value}
      onChange={(e) => setvalue(e.target.value)}
      onKeyDown={submitForSearch}
      size="small"
      placeholder="Search here.."
      variant="outlined"
      InputProps={{
        startAdornment: <SearchIcon />,
      }}
    />
  );
};
