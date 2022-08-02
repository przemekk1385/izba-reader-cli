type Article = {
  title: string;
  description: string;
  url: string;
  uuid: string;
};

type Review = {
  recipient: string;
  articles: Article[];
};

export type { Article, Review };
