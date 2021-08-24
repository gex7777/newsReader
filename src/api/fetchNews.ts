import { convertDates } from "./../utils/covertodate";
export const fetchNews = async () => {
  const apikey = "IHEwbeb7kN3f7I3Qizc1FqAJVexvcKUE";
  const endpoint = `https://get.scrapehero.com/news-api/news/?q=iphone&x-api-key=${apikey}`;
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
