import { Datum, Sentiment } from "../../../api/fetchNews";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { Divider, ListItem, ListItemText } from "@material-ui/core";
import { useEffect, useState } from "react";
export const NewsListItem: React.FC<Datum> = ({
  title,
  sentiment,
  publication,
  date,
  callback,
  id,
}) => {
  const [color, setcolor] = useState("");
  useEffect(() => {
    switch (sentiment) {
      case Sentiment.Positive:
        setcolor("green");
        break;
      case Sentiment.Neutral:
        setcolor("gray");
        break;
      default:
        setcolor("red");
        break;
    }
  }, []);

  return (
    <ListItem onClick={() => callback(id)}>
      <ListItemText>
        <h3 className="date">{date}</h3>
        <p className="heading">{title}</p>
        <div className="pub">
          <FiberManualRecordIcon style={{ color: color }} />
          <h3>{publication}</h3>
        </div>
      </ListItemText>
      <Divider />
    </ListItem>
  );
};
