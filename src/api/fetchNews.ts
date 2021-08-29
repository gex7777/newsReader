import moment from "moment";
import { convertDates } from "./../utils/covertodate";
export const fetchNews = async ({
  query = "iphone",
  sentiment = "",
  start_date = moment().subtract(65, "days").format("YYYY-MM-DD"),
  end_date = moment().format("YYYY-MM-DD"),
  source_id = "277%2C4171",
  category_id = "13010000%2C04018000",
} = {}) => {
  const apikey = "IHEwbeb7kN3f7I3Qizc1FqAJVexvcKUE";
  const endpoint = `https://get.scrapehero.com/news-api/news/?q=${query}${
    sentiment !== "" ? "&sentiment" : ""
  }${sentiment}&start_date=${start_date}&end_date=${end_date}&source_id=${source_id}&category_id=${category_id}&x-api-key=${apikey}`;
  const data = await (await fetch(endpoint)).json();
  let newsDatas = data.result.data;
  // const newsCount = data.result.count;
  // let dataUrl: string = data.result.nextUrl;
  /*
  while (newsDatas.length > newsCount) {
    let data: any;
    fetchMore(dataUrl).then((res) => {
      data = res;
      console.log(data);

      dataUrl = data.nextUrl;
      console.log(dataUrl);

      newsDatas = [...newsDatas, data.data];
    });
  }
*/
  return convertDates(newsDatas);
};
//const fetchMore = async (url: string) => {
// const modifiedurl = "https" + url.slice(4);

// const data = await (
//   await fetch(modifiedurl + `&x-api-key=IHEwbeb7kN3f7I3Qizc1FqAJVexvcKUE`)
//  ).json();

// return data.result;
//};
export interface Newsdata {
  data: Datum[];
  count: number;
  nextUrl: string;
}

export interface Datum {
  date: string;
  sentiment: Sentiment;
  title: string;
  content: string;
  url: string;
  id: string;
  parent_classification: ParentClassification;
  child_classification?: string;
  publication: string;
  callback?: any;
}

export enum ParentClassification {
  Health = "health",
  ScienceAndTechnology = "science and technology",
}

export enum Sentiment {
  Neutral = "Neutral",
  Positive = "Positive",
  Negative = "Negative",
}
export interface Sentiments {
  sentiment: Sentiment;
}
