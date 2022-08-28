export interface Article {
  id: string;
  name: string;
  amountInStock: number | 0;
}

export interface ArticleWithMetaData extends Article {
  amountRequired: number | 0;
}

export interface Product {
  id: string;
  name: string;
  articles: {
    id: string;
    amountRequired: number | 0;
  }[];
}

export interface ProductWithMetaData {
  id: string;
  name: string;
  articles: ArticleWithMetaData[];
  availableStock: number | 0;
}

export interface CartItem {
  id: string;
  name: string;
  articles: ArticleWithMetaData[];
  amountSold: number;
  availableStock: number | 0;
}

export interface ApiError {
  message: string;
}
