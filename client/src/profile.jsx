import { Fragment } from "react";
import { useState } from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import BubbleTittle from "./components/Tea/BubbleTittle";
import CartProvider from "./store/CartProvider";
import './profile.css';
import Order from "./components/Tea/order";
import { HiUser } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import classes from "./profile.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";


const Profile = () => {
  const [cartIsShown, setCartIsShown] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth0();
  const [profile, setProfile] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [newPhoneNumber, setNewPhoneNumber] = useState("");



  const showCardHandle = () => {
    setCartIsShown(true);
  };

  const hideCardHandle = () => {
    setCartIsShown(false);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/me`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            auth0Id: user.sub,
          }),
        });

        if (response.ok) {
          const userData = await response.json();
          setProfile(userData);
        } else {
          // 处理错误情况
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser(); // 调用函数获取用户信息
  }, [user.sub]); 

  const handleEditClick = () => {
    setIsEditing(true);
    setNewPhoneNumber(profile.tel);
  };

  const handleSaveClick = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/me`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: profile.email,
          tel: newPhoneNumber,
        }),
      });
      if (response.ok) {
        setProfile({ ...profile, tel: newPhoneNumber });
        setIsEditing(false);
      } else {
      }
    } catch (error) {
    }
  };
  

  return <CartProvider>
            {cartIsShown && <Cart onClose={hideCardHandle} />}
            <Header onShowCart={showCardHandle} />
            <main>
            <Fragment>
            <BubbleTittle>
            <div onClick={() =>  navigate("/app")} className="user"> 
            <HiUser />
            </div>
            <div className="email">{profile.email}</div>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={newPhoneNumber}
            onChange={(event) => setNewPhoneNumber(event.target.value)}
          />
          <button onClick={handleSaveClick}>Save</button>
        </div>
      ) : (
        <div className="phone">{profile.tel}</div>
      )}
      <button className="phone" onClick={handleEditClick}>Edit</button>
            </BubbleTittle>  
            <h2 className="orders">My Orders</h2>
            <Order/>
            </Fragment>
            </main>
        </CartProvider>;
};

export default Profile;