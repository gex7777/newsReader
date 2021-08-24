import BasicDatePicker from "./datepicker/datepicker.component";
import "./sidebar.styles.css";
import { NewsListItem } from "./newslistItem/newslistitem.component";
import { Datum } from "../../api/fetchNews";
import { Divider, List } from "@material-ui/core";
interface Props {
  news: Datum[];
  selectedArticle?: any;
}
export const SideBar: React.FC<Props> = ({ news, selectedArticle }) => {
  const callback = (id: string) => {
    selectedArticle(id);
  };
  return (
    <div className="sidebar">
      <BasicDatePicker />
      <Divider />
      <List style={{ maxHeight: 750, overflow: "auto" }}>
        {news.map((item) => (
          <NewsListItem key={item.id} callback={callback} {...item} />
        ))}
      </List>
    </div>
  );
};
