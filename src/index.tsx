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
import { Source } from "./api/fetchSources";
import { Categories } from "./api/fetchCategories";
export const App = () => {
  const [news, setnews] = useState<Datum[]>([]);
  const [filtered, setfiltered] = useState<Datum[]>([]);
  const [newsToDisplay, setNewsToDisplay] = useState<Datum>();
  const [searchValue, setSearchValue] = useState("iphone");
  useEffect(() => {
    fetchNews().then((res) => {
      setnews(res);
      setfiltered(res);
    });

    // eslint-disable-next-line
  }, []);
  const renderArticle = (id: string) => {
    setNewsToDisplay(filtered.find((e) => e.id === id));
  };
  const filternews = (date: Date[]) => {
    if (date === null || date[0] === null) {
      setfiltered([...news]);
      return;
    }

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

    console.log(filteredNews);
    setfiltered(filteredNews);
  };
  const searchNews = (value: string) => {
    if (typeof value !== "undefined") {
      setSearchValue(value);
      fetchNews({ query: value }).then((res) => setfiltered(res));
    }
  };
  const advancedSearch = (query: any) => {
    console.log(query);

    let categoryQ, sourceQ, sentimentQ;
    if (
      typeof query.categoryQuery.categories !== "undefined" &&
      query.categoryQuery.categories.length > 0
    ) {
      categoryQ = query.categoryQuery.categories
        .map((e: Categories) => e.iptc_code)
        .join("%2C");
    }
    if (
      typeof query.sourceQuery.sources !== "undefined" &&
      query.sourceQuery.sources.length > 0
    ) {
      sourceQ = query.sourceQuery.sources.map((e: Source) => e.id).join("%2C");
    }
    if (typeof query.sentimentQuery.sentiments.sentiment !== "undefined") {
      sentimentQ = query.sentimentQuery.sentiments.sentiment;
    }

    console.log(categoryQ, sourceQ, sentimentQ);
    console.log(
      fetchNews({
        query: searchValue,
        sentiment: sentimentQ,
        category_id: categoryQ,
        source_id: sourceQ,
      }).then((res) => setfiltered(res))
    );
  };
  return (
    <>
      <LocalizationProvider dateAdapter={DateAdapter}>
        <div className="appcontainer">
          <nav>
            <Header
              searchValue={searchNews}
              advancedSearchQuery={advancedSearch}
            />
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
