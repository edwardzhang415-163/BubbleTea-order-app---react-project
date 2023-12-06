

import { useEffect } from "react";
import { useAuthToken } from "../AuthTokenContext";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";


export default function VerifyUser() {
  const navigate = useNavigate();
  const { user } = useAuth0();
  const { accessToken } = useAuthToken();
  

  if (user) {
    (async () => {
      try {
        const data = await fetch(`${process.env.REACT_APP_API_URL}/verify-user`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            auth0Id: user.sub,
            name: user.name,
            email: user.email,
          }),
        });
        const userData = await data.json();
  
        if (userData.auth0Id) {
          navigate("/app");
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }
  // return  navigate("/app");;
}
