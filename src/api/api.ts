import { ERROR_MSG } from "../constants";
import { Article, CartItem, Product, ProductWithMetaData } from "../Types";

const API_URLS = {
  PRODUCTS: "/products/",
  ARTICLES: "/articles/",
  SALES: "/sales/",
};

type FetchOptions = {
  method: string;
  body: Object;
};

function wareHouseFetch<T>(
  url: string,
  options?: FetchOptions
): Promise<T | void> {
  const { method, body } = options ?? {};
  return fetch(url, {
    method,
    body: body && JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (response.ok) {
      return response.json() as unknown as T;
    }
    throw new Error(ERROR_MSG);
  });
}

export function fetchProducts(): Promise<Product[] | void> {
  return wareHouseFetch(API_URLS.PRODUCTS);
}

export function fetchArticles(): Promise<Article[] | void> {
  return wareHouseFetch(API_URLS.ARTICLES);
}

export function patchArticles(body: Article[]): Promise<Article[] | void> {
  return wareHouseFetch(API_URLS.ARTICLES, {
    method: "PATCH",
    body,
  });
}

export function postSale(cart: CartItem[]): Promise<any | void> {
  return wareHouseFetch(API_URLS.SALES, {
    method: "POST",
    body: {
      productId: cart[0].id,
      amountSold: cart[0].amountSold,
    },
  }).then((res) => updateArticles(cart));
}

// update this function to support sale of multiple products
function updateArticles(cart: CartItem[]) {
  const patchBody: any = [];
  cart[0].articles.forEach((article) => {
    patchBody.push({
      id: article.id,
      amountToSubtract: article.amountRequired * cart[0].amountSold,
    });
  });

  return patchArticles(patchBody);
}

export function computeAvailableStock(
  products: Product[],
  articlesStock: Article[]
) {
  const _products: Product[] = [...products];

  const productWithMetaData: ProductWithMetaData[] = [];

  if (_products.length > 0 && articlesStock.length > 0) {
    _products.forEach((_product: Product, index) => {
      productWithMetaData[index] = {
        ..._product,
        availableStock: 0,
      } as ProductWithMetaData;
      const product = productWithMetaData[index];
      const prodArticleStock: number[] = [];
      _product.articles.forEach((article, index) => {
        const item = articlesStock.find((item) => item.id === article.id);
        if (item) {
          product.articles[index].name = item.name;
          // article.name = item.name;
          const availableStock: number = Math.floor(
            item.amountInStock / article.amountRequired
          );
          prodArticleStock.push(availableStock);
        }
      });
      product.availableStock = Math.min(...prodArticleStock);
    });
  }
  return productWithMetaData;
}
