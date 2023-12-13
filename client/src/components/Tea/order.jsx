import Card from "../UI/Card";
import OrderItem from "./TeaItem/OrderItem";
import classes from "./InStockTeas.module.css";
import { useState, useEffect } from "react";
import { useAuthToken } from "../../AuthTokenContext";
import { useAuth0 } from "@auth0/auth0-react";

const Order = () => {
  const [Orders, setOrders] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [httpErrror, setHttpError] = useState();
  const { accessToken } = useAuthToken();
  const { user } = useAuth0();
  console.log(Orders);
  useEffect(() => {
    const fetchOrder = async () => {
      
      const responce = await fetch(
        `${process.env.REACT_APP_API_URL}/orders`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            auth0Id: user.sub,
          }),
        }
      );
      const data = await responce.json();
      console.log(data);
      const loadedOrders = [];

      for (const key in data) {
        loadedOrders.push({
          id: key,
          name: data[key].name,
          price: data[key].price,
          amount: data[key].amount,
          time: data[key].createdAt
        });
      }

      setOrders(loadedOrders);
      setLoading(false);
    };

    fetchOrder().catch(err => {
      setLoading(false);
      setHttpError(err.message);
    });
  }, [accessToken, user.sub, user]);

  if (isLoading) {
    return <section className={classes.teasloading}>
        <p>Loading...</p>
      </section>;
  }

  if (httpErrror) {
    return <section className={classes.teaserror}>
        <p>{httpErrror}</p>
      </section>;
  }

  const orderList = Orders.map(order => <OrderItem key={order.id} id={order.id} name={order.name} time = {order.time} price={order.price} amount={order.amount} />);
  return <section className={classes.teas}>
      <Card>
        <ul>{orderList}</ul>
      </Card>
    </section>;
};

export default Order;