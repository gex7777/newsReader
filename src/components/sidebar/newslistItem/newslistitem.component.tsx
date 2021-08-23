import { Datum } from "../../../api/fetchNews";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
export const NewsListItem: React.FC<Datum> = ({
  title,
  sentiment,
  publication,
  date,
}) => {
  return (
    <div>
      <h3 className="date">{date}</h3>
      <p className="heading">{title}</p>
      <h3 className="pub">
        <span>
          <FiberManualRecordIcon />
        </span>
        {publication}
      </h3>
    </div>
  );
};
