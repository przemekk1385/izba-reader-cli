type Feed = {
  title: string;
  description: string;
  url: string;
  uuid: string;
};

type News = Feed & { date: string };

type Review = {
  recipient: string;
  articles: (Feed | News)[];
};

export type { Feed, News, Review };
