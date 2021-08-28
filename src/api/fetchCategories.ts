export const fetchCatogories = async () => {
  const endpoint =
    "https://get.scrapehero.com/news-api/categories/?x-api-key=IHEwbeb7kN3f7I3Qizc1FqAJVexvcKUE";
  const data = await (await fetch(endpoint)).json();
  console.log(data);

  return data;
};

export interface Categories {
  category: string;
  iptc_code: string;
  sub_categories: SubCategory[];
}

export interface SubCategory {
  iptc_code: string;
  category: string;
}
