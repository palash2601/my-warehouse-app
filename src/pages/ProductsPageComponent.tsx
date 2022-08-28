import { useEffect, useState } from "react";

import Snackbar from "@mui/material/Snackbar";

import { Article, Product, CartItem, ProductWithMetaData } from "../Types";
import {
  fetchProducts,
  fetchArticles,
  computeAvailableStock,
  postSale,
} from "../api/api";

import { ProductsListComponent } from "../components/Product/ProductsListComponent";
import { ProductsPageSkeleton } from "./ProductsPageSkeleton";
import { CartComponent } from "../components/CartComponent";
import "./ProductsPage.css";
import { ERROR_MSG } from "../constants";

const ProductsPageComponent = () => {
  const amountSold = 1;
  const [productData, setProductData] = useState<Product[] | []>([]);
  const [productDetails, setProductDetails] = useState<
    ProductWithMetaData[] | []
  >([]);
  const [articlesStock, setArticlesStock] = useState<Article[] | []>([]);
  const [cart, setCart] = useState<CartItem[] | []>([]);
  const [error, setError] = useState<string | null>(null);
  const [isArticleLoading, setIsArticleLoading] = useState(false);
  const [isProductsLoading, setIsProductsLoading] = useState(true);
  const [isOrderInProgress, setIsOrderInProgress] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    async function getProducts() {
      try {
        const response = await fetchProducts();
        console.log("response", response);
        setProductData(response ?? []);
      } catch (response) {
        console.log("Error", response);
        setError(ERROR_MSG);
      } finally {
        setIsProductsLoading(false);
      }
    }

    async function getArticles() {
      try {
        setIsArticleLoading(true);
        let response = await fetchArticles();
        if (!response) {
          setError(ERROR_MSG);
        } else {
          setArticlesStock(response);
        }
      } catch (e) {
        console.error("error", e);
        setError(ERROR_MSG);
      }
    }

    getProducts();
    getArticles();
  }, []);

  useEffect(() => {
    if (
      isArticleLoading &&
      productData.length > 0 &&
      articlesStock.length > 0
    ) {
      setProductDetails(
        computeAvailableStock([...productData], [...articlesStock])
      );
      setIsArticleLoading(false);
    }
  }, [articlesStock, productData]);

  function handleAddToCart(product: ProductWithMetaData) {
    setCart([{ ...product, amountSold }]);
  }

  function handlePostSaleRes(res: any) {
    const updatedArticleData = res ?? [];
    if (updatedArticleData.length > 0) {
      setCart([]);
      setProductDetails(computeAvailableStock(productData, updatedArticleData));
      setArticlesStock([...updatedArticleData]);
      setFeedbackMessage("Order submitted successfully");
    } else {
      setFeedbackMessage(ERROR_MSG);
    }
  }

  function submitOrder() {
    setIsOrderInProgress(true);
    postSale(cart)
      .then(handlePostSaleRes)
      .catch(() => {
        setFeedbackMessage(ERROR_MSG);
      })
      .finally(() => {
        setIsOrderInProgress(false);
      });
  }

  if (error) {
    return <p>{error}</p>;
  } else if (isProductsLoading || isArticleLoading) {
    return <ProductsPageSkeleton />;
  } else if (productData?.length === 0) {
    return <p>no products found</p>;
  }

  return (
    <div className="container">
      <Snackbar
        open={!!feedbackMessage}
        autoHideDuration={2000}
        onClose={() => setFeedbackMessage("")}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        message={feedbackMessage}
      />
      <section>
        <h1>Products</h1>
        <ProductsListComponent
          isArticleLoading={isArticleLoading}
          productDetails={productDetails}
          onAddToCart={handleAddToCart}
        ></ProductsListComponent>
      </section>
      <section>
        <h1>Order</h1>
        <CartComponent
          cart={cart}
          isOrderInProgress={isOrderInProgress}
          submitOrder={submitOrder}
        />
      </section>
    </div>
  );
};

export default ProductsPageComponent;
