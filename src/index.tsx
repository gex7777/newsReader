import React from "react";
import ReactDOM from "react-dom";
import DateAdapter from "@material-ui/lab/AdapterDateFns";
import "./App.css";
import { Header } from "./components/header/header.component";
import { SideBar } from "./components/sidebar/sidebar.component";
import LocalizationProvider from "@material-ui/lab/LocalizationProvider";
import { fetchNews } from "./api/fetchNews";
import { useEffect } from "react";
import { useState } from "react";
export const App = () => {
  const [news, setnews] = useState([]);
  useEffect(() => {
    const fetchnews = async () => {
      const data = await fetchNews();
      setnews(data.data);
    };
    fetchnews();
  }, []);
  return (
    <>
      <LocalizationProvider dateAdapter={DateAdapter}>
        <div className="appcontainer">
          <nav>
            <Header />
          </nav>
          <main>Main</main>
          <div id="sidebar">
            <SideBar news={news} />
          </div>
        </div>
      </LocalizationProvider>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
