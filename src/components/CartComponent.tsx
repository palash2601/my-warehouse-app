import Button from "@mui/material/Button";

import { CircularComponent } from "./CircularComponent";
import { CartItem } from "../Types";

type CartProps = {
  cart: CartItem[];
  isOrderInProgress: Boolean;
  submitOrder: () => void;
};

export const CartComponent = ({
  cart,
  isOrderInProgress,
  submitOrder,
}: CartProps) => {
  if (cart.length === 0) {
    return <p>No products added</p>;
  }
  return (
    <section>
      {isOrderInProgress && <CircularComponent />}
      <ul>
        {cart.map((item: CartItem) => {
          return <li key={item.id}>{item.name}</li>;
        })}
      </ul>
      <Button variant="contained" onClick={submitOrder}>
        Submit Order
      </Button>
    </section>
  );
};
