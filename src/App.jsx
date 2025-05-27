import { toast, ToastContainer } from "react-toastify";
import { Navigate, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import SignUp from "./pages/SignUp";
import VerifyCodeForSignIn from "./pages/VerifyCodeForSignIn";
import SignIn from "./pages/SignIn";
import ForgetPassword from "./pages/ForgetPassword";
import VerifyCodeForForgetPassword from "./pages/VerifyCodeForForgetPassword";
import ChatContainer from "./pages/ChatContainer";
import { setAuthUser } from "./store/authSlice";
import "./App.css";
import { getCurrentUser } from "./apis";
import Loader from "./components/Loader";
import Admin from "./pages/Admin";
function App() {
  const authUser = useSelector((state) => state.auth.authUser);
  const [isloadding, setIsLoadding] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        dispatch(setAuthUser(res.data.data));
      })
      .catch((err) => {
        dispatch(setAuthUser(null));
      })
      .finally(() => {
        setIsLoadding(false);
      });
  }, []);

  return (
    <>
      {isloadding && (
        <div className="w-full h-screen flex justify-center items-center">
          <Loader />
        </div>
      )}
      <Routes>
        <Route
          path=""
          element={
            authUser ? (
              authUser.role === "admin" ? (
                <Admin />
              ) : (
                <ChatContainer />
              )
            ) : (
              <SignIn />
            )
          }
        />
        <Route
          path="signup"
          element={!authUser ? <SignUp /> : <Navigate to="/" />}
        />
        <Route
          path="signin"
          element={!authUser ? <SignIn /> : <Navigate to="/" />}
        />
        <Route
          path="verifycodeforsignin"
          element={!authUser ? <VerifyCodeForSignIn /> : <Navigate to="/" />}
        />
        <Route
          path="verifycodeforforgetpassword"
          element={
            !authUser ? <VerifyCodeForForgetPassword /> : <Navigate to="/" />
          }
        />
        <Route
          path="forgetpassword"
          element={!authUser ? <ForgetPassword /> : <Navigate to="/signin" />}
        />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
