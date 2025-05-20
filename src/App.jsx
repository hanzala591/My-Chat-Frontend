import { ToastContainer } from "react-toastify";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function App() {
  const authUser = useSelector((state) => state.auth.authUser);
  return (
    <>
      <Outlet />
      <ToastContainer />
    </>
  );
}

export default App;
