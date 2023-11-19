import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Marketplace from "./pages/Marketplace";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import Footer from "./components/homepage/Footer";
import Login from "./pages/Login";
import SignPage from "./pages/SignPage";
import Wallet from "./pages/Wallet";
import User from "./pages/User";
import Rankings from "./pages/Rankings";
import CreateCreator from "./pages/CreateCreator";
import CreateNftspage from "./pages/CreateNfts";
import Mepage from "./pages/Mepage";
import Error from "./pages/Error";
import Me from "./pages/Me";
import ResetPage from "./pages/ResetPage";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/signup" element={<SignPage />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/user/:id" element={<User />} />
          <Route path="/rankings" element={<Rankings />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/reset/:id" element={<ResetPage />} />
          <Route path="/createcreator" element={<CreateCreator />} />
          <Route path="/createnfts" element={<CreateNftspage />} />
          <Route path="/mepage" element={<Mepage />}>
            <Route index element={<Navigate to={"me"} />} />
            <Route path="createcreator" element={<CreateCreator />} />
            <Route path="createnft" element={<CreateNftspage />} />
            <Route path="me" element={<Me />} />
          </Route>
          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
