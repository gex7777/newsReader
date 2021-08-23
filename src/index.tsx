import React from "react";
import ReactDOM from "react-dom";
import DateAdapter from "@material-ui/lab/AdapterDateFns";
import "./App.css";
import { Header } from "./components/header/header.component";
import { SideBar } from "./components/sidebar/sidebar.component";
import LocalizationProvider from "@material-ui/lab/LocalizationProvider";
import { fetchNews } from "./api/fetchNews";
import { useEffect } from "react";
export const App = () => {
  useEffect(() => {
    const fetchnews = async () => {
      const data = await fetchNews();
      console.log(data);
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
            <SideBar />
          </div>
        </div>
      </LocalizationProvider>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
