import { useContext } from "react";
import CartContext from "../../../store/Cart-Context";
import classes from "./TeaItem.module.css";
import TeaItemForm from "./TeaItemForm";
import { useNavigate } from "react-router-dom";


const TeaItem = (props) => {
    const cartContext = useContext(CartContext);
    const price = `$${props.price.toFixed(2)}`;
    const navigate = useNavigate();


    const addToCartHandler = (amount) => {
        cartContext.additem({
            id: props.id,
            name: props.name,
            amount: amount,
            price: props.price,
        });
    };

    return (
        <li className={classes.tea}>
            <div>
                <h3 onClick={() => navigate("/app/" + props.id)}>{props.name}</h3>
                <div className={classes.description}>{props.description}</div>
                <div className={classes.price}>{price}</div>
            </div>
            <TeaItemForm onAddToCart={addToCartHandler} />
        </li>
    );
};

export default TeaItem;
