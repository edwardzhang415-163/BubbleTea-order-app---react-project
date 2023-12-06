import { Fragment } from "react";
import { useState } from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import BubbleTittle from "./components/Tea/BubbleTittle";
import CartProvider from "./store/CartProvider";
import './Detail.css';
import TeaDetails from "./components/Tea/TeaDetails";

function Detail() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCardHandle = () => {
    setCartIsShown(true);
  };

  const hideCardHandle = () => {
    setCartIsShown(false);
  };

  return <CartProvider>
            {cartIsShown && <Cart onClose={hideCardHandle} />}
            <Header onShowCart={showCardHandle} />
            <main>
            <Fragment>
            <BubbleTittle>
            <h2>The best bubble Tea in the world!</h2>
            <p>
            In 2023, we created the first cup of Cheese Tea, pioneering the use of real ingredients such as real milk, real fruit, real tea, and real natural cane sugar. 
            </p>
            <p>
            Together, we bring true quality tea beverages and an inspiring brand to more users,promoting the culture of JOY.
            </p>
            </BubbleTittle>  
            <TeaDetails />
            </Fragment>
            </main>
        </CartProvider>;
}

export default Detail;