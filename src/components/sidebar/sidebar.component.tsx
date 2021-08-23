import BasicDatePicker from "./datepicker/datepicker.component";
import "./sidebar.styles.css";
import { NewsListItem } from "./newslistItem/newslistitem.component";
import { Datum } from "../../api/fetchNews";
interface Props {
  news: Datum[];
  callback?: () => void;
}
export const SideBar: React.FC<Props> = ({ news }) => {
  return (
    <div className="sidebar">
      <BasicDatePicker />
      {news.map((item) => (
        <NewsListItem {...item} />
      ))}
    </div>
  );
};
