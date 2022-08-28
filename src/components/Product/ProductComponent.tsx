import { Article, ProductWithMetaData } from "../../Types";
import { ArticleComponent } from "../Article/ArticleComponent";

type ProductProps = {
  product: ProductWithMetaData;
};

export const ProductComponent = ({ product }: ProductProps) => {
  return (
    <section>
      <p>Available: {product.availableStock}</p>

      <h3>Articles</h3>
      <ul>
        {product.articles.map((article: Article) => {
          return <ArticleComponent article={article} key={article.id} />;
        })}
      </ul>
    </section>
  );
};
