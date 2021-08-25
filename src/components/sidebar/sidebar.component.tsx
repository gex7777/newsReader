import "./sidebar.styles.css";
import { NewsListItem } from "./newslistItem/newslistitem.component";
import { Datum } from "../../api/fetchNews";
import { Divider, List } from "@material-ui/core";
import { BasicDateRangePicker } from "./datepicker/datepicker.component";
interface Props {
  news: Datum[];
  selectedArticle?: any;
  filternews?: any;
}
export const SideBar: React.FC<Props> = ({
  news,
  selectedArticle,
  filternews,
}) => {
  const callback = (id: string) => {
    selectedArticle(id);
  };
  const filterthenews = (data: Date[]) => {
    filternews(data);
  };
  return (
    <div className="sidebar">
      <div className="datepicker">
        <BasicDateRangePicker filternews={filterthenews} />
      </div>
      <List style={{ maxHeight: 725, overflow: "auto" }}>
        {news.map((item) => (
          <NewsListItem key={item.id} callback={callback} {...item} />
        ))}
      </List>
    </div>
  );
};
