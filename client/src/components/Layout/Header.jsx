import React, { Fragment } from "react";

import HeaderCartButton from "./HeaderCartButton";

import mealsImg from "../../assets/meals.jpg";
import classes from "./Header.module.css";
import { HiUser } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const Header = (props) => {
    const navigate = useNavigate();
    return (
        <Fragment>
            <header className={classes.header}>
            <div onClick={() =>  navigate("/profile")} className={classes.user}> 
                    <HiUser />
            </div>
            {/* <h3 onClick={props.onShowCart}>Edward's BubbleTea</h3> */}
                <HeaderCartButton onClick={props.onShowCart} />
            </header>
            <div className={classes["main-image"]}>
                <img src={mealsImg} alt="A table full of delicious food!" />
            </div>
        </Fragment>
    );
};

export default Header;
