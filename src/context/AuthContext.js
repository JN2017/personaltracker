import { AsyncStorage } from "react-native";
import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";
import { navigate } from "../navigationRef";

const authReducer = (state, action) => {
  switch (action.type) {
    default:
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "signup":
      return { errorMessage: "", token: action.payload };
    case "signin":
      return { errorMessage: "", token: action.payload };
    case "clear_error_message":
      return { ...state, errorMessage: "" };
    case "signout":
      return { token: null, errorMessage: "" };
      return state;
  }
};

const tryLocalSignin = (dispatch) => async () => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    dispatch({ type: "signin", payload: token });
    navigate("TrackList");
  } else {
    navigate("Signin");
  }
};

const clearErrorMessage = (dispatch) => () => {
  dispatch({ type: "clear_error_message" });
};

const signup = (dispatch) => async ({ email, password }) => {
  // removed return as we are retuening only one bloc
  // make an api request to signup with the email and the password
  try {
    const response = await trackerApi.post("/signup", { email, password });
    //Store the token from /signup in the local storage:
    await AsyncStorage.setItem("token", response.data.token);
    dispatch({
      type: "signup",
      payload: response.data.token,
    });
    //navigate to main flow
    navigate("TrackList");
  } catch (err) {
    console.log("SignUp error:", err.response.data);
    //if signup, modify our state, and say that we are authenticated
    //if signin up fails, we probably need to reflect an err msg somewhere
    dispatch({
      type: "add_error",
      payload: "something went wrong with sign up!",
    });
  }
};

const signin = (dispatch) => {
  return async ({ email, password }) => {
    //try to signin
    try {
      const response = await trackerApi.post("/signin", { email, password });
      await AsyncStorage.setItem("token", response.data.token);
      dispatch({
        //handle success by updating the state
        type: "signin",
        payload: response.data.token,
      });
      navigate("TrackList");
    } catch (err) {
      console.log("SignIn error:", err.response.data);
      dispatch({
        //Handle failure by showing err msg somehow
        type: "add_error",
        payload: "something went wrong with sign in!",
      });
    }
  };
};

const signout = (dispatch) => async () => {
  // signout
  await AsyncStorage.removeItem("token");
  dispatch({ type: "signout" });
  navigate("loginFlow");
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, signout, signup, clearErrorMessage, tryLocalSignin },
  { token: null, errorMessage: "" }
);
//"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjRhNTE3NGE0YmI2MjY1N2QzOTI2ZmYiLCJpYXQiOjE1OTg3MDYwMzh9.CqfTeNx95yZn_QL4ZJ2b7i3DngefdLXKp1D4MLG0bJs"
