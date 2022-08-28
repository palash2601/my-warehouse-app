import React, { Suspense } from "react";
import { Routes, Route, Link } from "react-router-dom";

import "./App.css";
import ErrorBoundary from "./components/ErrorBoundary";
import { ProductsPageSkeleton } from "./pages/ProductsPageSkeleton";

const ProductsPageComponent = React.lazy(
  () => import("./pages/ProductsPageComponent")
);

function App() {
  return (
    <div className="App">
      <header className="App-header">My Warehouse</header>
      <main className="App-main">
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="products"
              element={
                <Suspense fallback={<ProductsPageSkeleton />}>
                  <nav>
                    <Link to="/">Home</Link>
                  </nav>
                  <ProductsPageComponent />
                </Suspense>
              }
            />
          </Routes>
        </ErrorBoundary>
      </main>
    </div>
  );
}

function Home() {
  return (
    <>
      <h2>Welcome!</h2>

      <nav>
        <Link to="/products">Products</Link>
      </nav>
    </>
  );
}

export default App;
