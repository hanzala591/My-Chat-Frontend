import { ToastContainer } from "react-toastify";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import VoiceToText from "./pages/VoiceToText";
import ChatContainer from "./pages/ChatContainer";
import Delete from "./pages/Delete";

function App() {
  const authUser = useSelector((state) => state.auth.authUser);
  return (
    <>
      {/* <Outlet />
      <ToastContainer /> */}
      {/* <VoiceToText /> */}
      {/* <ChatContainer /> */}
      <ChatContainer />
    </>
  );
}

export default App;
