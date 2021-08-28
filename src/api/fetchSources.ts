export const fetchSources = async () => {
  const endpoint =
    "https://get.scrapehero.com/news-api/sources/?x-api-key=IHEwbeb7kN3f7I3Qizc1FqAJVexvcKUE";
  const data: Sources = await (await fetch(endpoint)).json();
  return data.sources;
};

export interface Sources {
  sources: Source[];
}

export interface Source {
  id: number;
  name: string;
  domain: string;
}
