import { Article } from "../../Types";

type ArticleProps = {
  article: Article;
};

export const ArticleComponent = (props: ArticleProps) => {
  return (
    <li>
      <p>{props.article.name}</p>
    </li>
  );
};
