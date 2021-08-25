import React from "react";
import ReactDOM from "react-dom";
import DateAdapter from "@material-ui/lab/AdapterDateFns";

import { Header } from "./components/header/header.component";
import { SideBar } from "./components/sidebar/sidebar.component";
import LocalizationProvider from "@material-ui/lab/LocalizationProvider";
import { Datum, fetchNews } from "./api/fetchNews";
import { useEffect } from "react";
import { useState } from "react";
import { MainReader } from "./components/main/main.component";
import moment from "moment";
import "./App.css";
export const App = () => {
  const [news, setnews] = useState<Datum[]>([]);
  const [filtered, setfiltered] = useState<Datum[]>([]);
  const [newsToDisplay, setNewsToDisplay] = useState<Datum>();
  useEffect(() => {
    fetchNews().then((res) => {
      setnews(res);
      setfiltered(res);
    });

    // eslint-disable-next-line
  }, []);
  const renderArticle = (id: string) => {
    setNewsToDisplay(news.find((e) => e.id === id));
  };
  const filternews = (date: Date[]) => {
    const filteredNews = news.filter((news) => {
      let format = "LL";
      let newstime = moment(news.date, format);
      let start = moment(date[0], format);
      let end = moment(date[1], format);
      if (newstime.isBetween(start, end, undefined, "[]")) {
        return true;
      } else {
        return false;
      }
    });
    setfiltered(filteredNews);
  };
  return (
    <>
      <LocalizationProvider dateAdapter={DateAdapter}>
        <div className="appcontainer">
          <nav>
            <Header />
          </nav>
          <main>
            <MainReader news={newsToDisplay} />
          </main>
          <div id="sidebar">
            <SideBar
              news={filtered}
              selectedArticle={renderArticle}
              filternews={filternews}
            />
          </div>
        </div>
      </LocalizationProvider>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
