import Button from "@material-ui/core/Button";
import "./header.styles.css";
import { SearchBar } from "./searchbar/searchbar.component";

import { useState } from "react";
import Backdrop from "@material-ui/core/Backdrop";
import { FormDialog } from "./dialog/dialog.component";
interface props {
  searchValue?: any;
  advancedSearchQuery?: any;
}
export const Header: React.FC<props> = ({
  searchValue,
  advancedSearchQuery,
}) => {
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

        <FormDialog callback={advancedSearchQuery} />
      </div>
    </>
  );
};
