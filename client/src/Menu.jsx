import React, { useState } from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import BubbleTea from "./components/Tea/BubbleTea";
import CartProvider from "./store/CartProvider";
import './Menu.css'

function Menu() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCardHandle = () => {
    setCartIsShown(true);
  };

  const hideCardHandle = () => {
    setCartIsShown(false);
  };

  const showMap = () => {
    const latitude = 49.280449;
    const longitude = -123.115840;
    const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
    window.open(googleMapsUrl);
  };

  return (
    <CartProvider>
      {cartIsShown && <Cart onClose={hideCardHandle} />}
      <Header onShowCart={showCardHandle} />
      <main>
        <BubbleTea />
        <button className="mapButton" onClick={showMap}>Find Us</button>
      </main>
    </CartProvider>
  );
}

export default Menu;
