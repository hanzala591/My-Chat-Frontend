import { ToastContainer } from "react-toastify";
import RecieverMessage from "./components/RecieverMessage.jsx";
import SenderMessage from "./components/SenderMessage.jsx";
import Chat from "./pages/Chat.jsx";
import ConfirmCode from "./pages/ConfirmCode.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import VoiceToText from "./pages/VoiceToText.jsx";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Outlet />
      <ToastContainer />
    </>
  );
}

export default App;
