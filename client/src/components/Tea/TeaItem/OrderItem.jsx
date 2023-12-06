import classes from "./TeaItem.module.css";

const OrderItem = props => {
  const price = `$${props.price.toFixed(2)}`;
  const time = `${props.time.substring(0, 16).replace("T", " ")}`;
  return <li className={classes.tea}>
            <div>
                <h3>{props.name}</h3>
                <div className={classes.time}>{time}</div>
                <div className={classes.price}>{price}</div>
            </div>
            <h4 className={classes.amount}>Amount: {props.amount}</h4>
        </li>;
};

export default OrderItem;