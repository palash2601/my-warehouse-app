import Button from "@mui/material/Button";
import Skeleton from "@mui/material/Skeleton";

import { ProductWithMetaData } from "../../Types";
import { ProductComponent } from "./ProductComponent";

type ProductsListProps = {
  productDetails: ProductWithMetaData[];
  isArticleLoading: boolean;
  onAddToCart: (prod: ProductWithMetaData) => void;
};

export const ProductsListComponent = ({
  isArticleLoading,
  productDetails,
  onAddToCart,
}: ProductsListProps) => {
  return (
    <ul>
      {productDetails.map((product) => (
        <li key={product.id}>
          <h2>{product.name}</h2>

          {isArticleLoading ? (
            <section>
              <Skeleton variant="text" sx={{ fontSize: "2rem" }} width={210} />
              <Skeleton variant="rectangular" width={210} height={118} />
            </section>
          ) : (
            <section>
              <ProductComponent key={product.id} product={product} />
              {product.availableStock && (
                <Button
                  variant="contained"
                  onClick={() => onAddToCart(product)}
                >
                  Add to cart
                </Button>
              )}
            </section>
          )}
        </li>
      ))}
    </ul>
  );
};
