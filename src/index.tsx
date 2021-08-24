import React from "react";
import ReactDOM from "react-dom";
import DateAdapter from "@material-ui/lab/AdapterDateFns";
import "./App.css";
import { Header } from "./components/header/header.component";
import { SideBar } from "./components/sidebar/sidebar.component";
import LocalizationProvider from "@material-ui/lab/LocalizationProvider";
import { Datum, fetchNews } from "./api/fetchNews";
import { useEffect } from "react";
import { useState } from "react";
import { MainReader } from "./components/main/main.component";
export const App = () => {
  const [news, setnews] = useState<Datum[]>([]);
  const [newsToDisplay, setNewsToDisplay] = useState<Datum>();
  useEffect(() => {
    fetchNews().then((res) => setnews(res));
    // eslint-disable-next-line
  }, []);
  const renderArticle = (id: string) => {
    setNewsToDisplay(news.find((e) => e.id === id));
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
            <SideBar news={news} selectedArticle={renderArticle} />
          </div>
        </div>
      </LocalizationProvider>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
