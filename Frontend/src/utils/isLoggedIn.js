import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { setLogin } from "../redux-slices/authSlices";

export const isLoggedIn = (dispatch) => {
  const token = Cookies.get("token");

  if (!token) return null;

  const tokenDetails = jwtDecode(token);
  if (tokenDetails) {
    dispatch(
      setLogin({ userId: tokenDetails.user_id, role: tokenDetails.user_type })
    );
    return tokenDetails.user_type;
  } else {
    return null;
  }
};
