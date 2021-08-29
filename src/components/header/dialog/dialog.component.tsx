import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import DialogTitle from "@material-ui/core/DialogTitle";
import { IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

import { Source } from "./../../../api/fetchSources";
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
const getQueriesFromLocalstorage = JSON.parse(
  localStorage.getItem("query") || "[]"
);

export const FormDialog: React.FC<DialogProps> = ({ callback }) => {
  const [numberFilters, setNumberFilters] = useState(1);
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = useState<any>(getQueriesFromLocalstorage);
  const [categoryQuery, setcategoryQuery] = useState<any>({ categories: [] });
  const [sourceQuery, setsourceQuery] = useState<any>({ sources: [] });
  const [objsToRender, setObjsToRender] = useState<any>([]);
  const [sentimentQuery, setSentimentQuery] = useState<any>({ sentiments: [] });
  const [options, setoptions] = useState<Source[]>([
    { id: 1, name: "", domain: "us.cnn.com" },
  ]);
  useEffect(() => {
    setQuery({ categoryQuery, sourceQuery, sentimentQuery });
  }, [categoryQuery, sentimentQuery, sourceQuery]);
  useEffect(() => {
    localStorage.setItem("query", JSON.stringify(query));
  }, [query]);
  const handleClickOpen = () => {
    setOpen(true);
  };
  /*useEffect(() => {
    getNumberOffilters();
    // eslint-disable-next-line
  }, []);
  */
  const handleClose = () => {
    setOpen(false);
  };
  console.log(open);
  /* const handleOptions = (e: SelectChangeEvent) => {
    console.log(e.target.value);
    switch (e.target.value.toString()) {
      case "20":
        fetchSources().then((res) => setoptions(res));
        break;
      case "10":
        break;
    }
  }; */
  const getQueryValues = (arrayValues: any) => {
    if ("categories" in arrayValues) {
      setcategoryQuery(arrayValues);
    } else if ("sources" in arrayValues) {
      setsourceQuery(arrayValues);
    } else if ("sentiments" in arrayValues) {
      setSentimentQuery(arrayValues);
    }
  };
  const getNumberOffilters = () => {
    let objs: any = [];
    let count = 1;
    if (
      typeof query.categoryQuery.categories !== "undefined" &&
      query.categoryQuery.categories.length > 0
    ) {
      count++;
      objs = [
        ...objs,
        { option: "10", values: query.categoryQuery.categories },
      ];
    }
    if (
      typeof query.sourceQuery.sources !== "undefined" &&
      query.sourceQuery.sources.length > 0
    ) {
      count++;
      objs = [...objs, { option: "10", values: query.sourceQuery.sources }];
    }
    if (typeof query.sentimentQuery.sentiments.sentiment !== "undefined") {
      count++;
      objs = [
        ...objs,
        { option: "20", values: query.sentimentQuery.sentiments },
      ];
    }
    if (count === 4) {
      count = 3;
    }
    setNumberFilters(count);
    setObjsToRender(objs);
  };
  const onsubmit = () => {
    if (query.length !== 0) {
      callback(query);
    }
    handleClose();
  };

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
            Show Results
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
