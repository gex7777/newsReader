import { convertDates } from "./../utils/covertodate";
export const fetchNews = async (
  query = "iphone",
  sentiment = "",
  start_date = "2020-12-01",
  end_date = "2020-12-03",
  source_id = "277%2C4171",
  category_id = "13010000%2C04018000"
) => {
  const apikey = "IHEwbeb7kN3f7I3Qizc1FqAJVexvcKUE";
  const endpoint = `https://get.scrapehero.com/news-api/news/?q=${query}${
    sentiment != "" ? "&sentiment" : ""
  }${sentiment}&start_date=${start_date}&end_date=${end_date}&source_id=${source_id}&category_id=${category_id}&x-api-key=${apikey}`;
  const data = await (await fetch(endpoint)).json();

  return convertDates(data.result.data);
};

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
}
