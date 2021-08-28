import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  Autocomplete,
  Box,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Select, { SelectChangeEvent } from "@material-ui/core/Select";
import { fetchSources, Source } from "./../../../api/fetchSources";
import { FilterRow } from "./filterrow.component";
export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}
interface DialogProps {
  callback?: any;
}
const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};
export const FormDialog: React.FC<DialogProps> = ({ callback }) => {
  const [numberFilters, setNumberFilters] = useState(1);
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = useState<any>([]);
  const [categoryQuery, setcategoryQuery] = useState<any>([]);
  const [sourceQuery, setsourceQuery] = useState<any>([]);
  const [sentimentQuery, setSentimentQuery] = useState<any>([]);
  const [options, setoptions] = useState<Source[]>([
    { id: 1, name: "", domain: "us.cnn.com" },
  ]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  console.log(open);
  const handleOptions = (e: SelectChangeEvent) => {
    console.log(e.target.value);
    switch (e.target.value.toString()) {
      case "20":
        fetchSources().then((res) => setoptions(res));
        break;
      case "10":
        break;
    }
  };
  const getQueryValues = (arrayValues: any) => {
    if ("categories" in arrayValues) {
      setcategoryQuery(arrayValues);
    } else if ("sources" in arrayValues) {
      setsourceQuery(arrayValues);
    } else if ("sentiments" in arrayValues) {
      setSentimentQuery(arrayValues);
    }
  };

  const onsubmit = () => {
    setQuery({ categoryQuery, sourceQuery, sentimentQuery });
  };

  console.log(query);

  return (
    <>
      <Button
        style={{ textTransform: "none", marginLeft: ".5em", height: "40px" }}
        variant="outlined"
        className="searchbutton"
        onClick={handleClickOpen}
        color="primary"
      >
        Advance Search
      </Button>

      <Dialog
        maxWidth="md"
        fullWidth={true}
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Advanced Search
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <DialogContent>
            <Button
              onClick={() => setNumberFilters((old) => old + 1)}
              variant="outlined"
              sx={{ marginBottom: "20px" }}
              disabled={numberFilters > 2}
            >
              Add Filter
            </Button>
            {[...Array(numberFilters)].map((e, i) => (
              <FilterRow key={i} callback={getQueryValues} />
            ))}
          </DialogContent>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={onsubmit} variant="outlined" color="primary">
            Search
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
