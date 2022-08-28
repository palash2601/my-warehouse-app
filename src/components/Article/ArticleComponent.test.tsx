import React from "react";
import { render, screen } from "@testing-library/react";
import { ArticleComponent } from "./ArticleComponent";

test("renders given article name", () => {
  render(
    <ArticleComponent
      article={{
        id: "foo",
        name: "bar",
        amountInStock: 0,
      }}
    />
  );
  const articleNameElement = screen.getByText(/bar/i);
  expect(articleNameElement).toBeInTheDocument();
});
