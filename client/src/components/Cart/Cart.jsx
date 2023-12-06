import { Fragment } from "react";
import { useContext, useState } from "react";
import CartContext from "../../store/Cart-Context";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import { useAuthToken } from "../../AuthTokenContext";
import { useAuth0 } from "@auth0/auth0-react";



const Cart = (props) => {
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [submited, setSubmited] = useState(false);
  const { accessToken } = useAuthToken();
  const { user } = useAuth0();

  const cartContext = useContext(CartContext);

  const totalAmount = `$${cartContext.totalAmount.toFixed(2)}`;
  const hasItems = cartContext.items.length > 0;

  const cartItemRemoveHadler = (id) => {
    cartContext.removeItem(id);
  };
  const cartItemAddHadler = (item) => {
    cartContext.additem(item);
  };

 

  const submitOrderHandler = async (userData) => {
    setIsSubmiting(true);
    for (const item of cartContext.items) {
      const amount = item.amount;
      const responce = await fetch(
        `${process.env.REACT_APP_API_URL}/order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            name: item.name,
            price: item.price,
            intro: item.intro,
            amount: item.amount,
            auth0Id: user.sub,
           
          }),
        }
      );
    }
    // await fetch(
    //   "https://react-http-87b5f-default-rtdb.firebaseio.com/orders.json",
    //   {
    //     method: "POST",
    //     body: JSON.stringify({
    //       user: userData,
    //       orderItems: cartContext.items,
    //     }),
    //   }
    // );
    setIsSubmiting(false);
    setSubmited(true);
    cartContext.clearCart();
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartContext.items.map((item, id) => (
        <CartItem
          key={id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHadler.bind(null, item.id)}
          onAdd={cartItemAddHadler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={submitOrderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {modalActions}
    </Fragment>
  );

  const isSubmitingModalContent = <p>Sending order data...</p>;

  const submitedModalContent = (
    <Fragment>
      <p>Successfully sent the order</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isSubmiting && !submited && cartModalContent}
      {isSubmiting && isSubmitingModalContent}
      {!isSubmiting && submited && submitedModalContent}
    </Modal>
  );
};

export default Cart;
