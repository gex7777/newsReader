import { Datum } from "../../api/fetchNews";
import "./main.component.css";
interface props {
  news: Datum | undefined;
}
export const MainReader: React.FC<props> = ({ news }) => {
  if (news) {
    return (
      <>
        <div
          className="maincontainer"
          style={{ maxHeight: 730, overflow: "auto" }}
        >
          <div className="maintitle">{news.title}</div>
          <div className="publisherndate">
            <p className="publishername">{news.publication}</p>
            <p className="newsdate">{news.date}</p>
          </div>
          <p className="newsdata">{news.content}</p>
        </div>
      </>
    );
  } else {
    return (
      <div className="emptyView">
        <h1>select a news article</h1>
      </div>
    );
  }
};
