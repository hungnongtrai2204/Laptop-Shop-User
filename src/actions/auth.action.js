import axios from "../helpers/axios";
import {
  authConstants,
  cartConstants,
  wishConstants,
  compareConstants,
} from "./constants";

export const signup = (user) => {
  return async (dispatch) => {
    try {
      dispatch({ type: authConstants.SIGNUP_REQUEST });
      const res = await axios.post(`/signup`, user);
      if (res.status === 201) {
        dispatch({ type: authConstants.SIGNUP_SUCCESS });
        const { token, user } = res.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        dispatch({
          type: authConstants.LOGIN_SUCCESS,
          payload: {
            token,
            user,
          },
        });
      } else {
        dispatch({ type: authConstants.SIGNUP_FAILURE });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const login = (user) => {
  return async (dispatch) => {
    dispatch({ type: authConstants.LOGIN_REQUEST });
    const res = await axios.post("/signin", {
      ...user,
    });

    if (res.status === 200) {
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      dispatch({
        type: authConstants.LOGIN_SUCCESS,
        payload: {
          token,
          user,
        },
      });
    } else {
      if (res.status === 400) {
        dispatch({
          type: authConstants.LOGIN_FAILURE,
          payload: { error: res.data.error },
        });
      }
    }
  };
};

export const isUserLoggedIn = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = JSON.parse(localStorage.getItem("user"));
      dispatch({
        type: authConstants.LOGIN_SUCCESS,
        payload: {
          token,
          user,
        },
      });
    } else {
      dispatch({
        type: authConstants.LOGIN_FAILURE,
        payload: { error: "Failed to login" },
      });
    }
  };
};

// Đăng xuất
export const signout = () => {
  return async (dispatch) => {
    dispatch({ type: authConstants.LOGOUT_REQUEST });
    // localStorage.removeItem("user");
    // localStorage.removeItem("token");
    localStorage.clear();
    dispatch({ type: authConstants.LOGOUT_SUCCESS });
    dispatch({ type: cartConstants.RESET_CART });
    dispatch({ type: wishConstants.RESET_WISH });
    dispatch({ type: compareConstants.RESET_COMPARE });
    // const res = await axios.post('/admin/signout');

    // if (res.status === 200) {

    //     localStorage.clear();
    //     dispatch({ type: authConstants.LOGOUT_SUCCESS });
    // }
    // else {
    //     dispatch({
    //         type: authConstants.LOGOUT_FAILURE,
    //         payload: { error: res.data.error }
    //     });
    // }
  };
};

export const changeInfo = (user, addToast) => {
  return async (dispatch) => {
    dispatch({ type: authConstants.CHANGE_INFO_REQUEST });
    const res = await axios.post("/user/changeInfo", user);

    if (res.status === 202) {
      // const { token, user } = res.data;
      // localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      if (addToast) {
        addToast("Change infomation success", {
          appearance: "success",
          autoDismiss: true,
        });
      }
      dispatch({
        type: authConstants.CHANGE_INFO_SUCCESS,
        payload: {
          user,
        },
      });
    } else {
      if (res.status === 400) {
        dispatch({
          type: authConstants.CHANGE_INFO_FAILURE,
          payload: { error: res.data.error },
        });
      }
    }
  };
};

export const changePassword = (user, password, addToast) => {
  return async (dispatch) => {
    dispatch({ type: authConstants.CHANGE_INFO_REQUEST });
    const payload = {
      ...user,
      password,
    };
    const res = await axios.post("/user/changePassword", payload);

    if (res.status === 202) {
      // const { token, user } = res.data;
      // localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      if (addToast) {
        addToast("Change password success", {
          appearance: "success",
          autoDismiss: true,
        });
      }
      dispatch({
        type: authConstants.CHANGE_INFO_SUCCESS,
        payload: {
          user,
        },
      });
    } else {
      if (res.status === 400) {
        dispatch({
          type: authConstants.CHANGE_INFO_FAILURE,
          payload: { error: res.data.error },
        });
      }
    }
  };
};
