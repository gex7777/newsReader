import Button from "@material-ui/core/Button";
import "./header.styles.css";
import { SearchBar } from "./searchbar/searchbar.component";

import { useState } from "react";
import Backdrop from "@material-ui/core/Backdrop";
interface props {
  searchValue?: any;
}
export const Header: React.FC<props> = ({ searchValue }) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };
  const callback = (value: string) => {
    searchValue(value);
  };
  return (
    <>
      <div className="navcontainer">
        <div className="logo">
          News<span>Reader</span>
        </div>
        <SearchBar searchValue={callback} />
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
          onClick={handleClose}
        >
          hellow
        </Backdrop>
        <Button
          style={{ textTransform: "none", marginLeft: ".5em", height: "40px" }}
          variant="outlined"
          className="searchbutton"
          onClick={handleToggle}
          color="primary"
        >
          Advance Search
        </Button>
      </div>
    </>
  );
};
