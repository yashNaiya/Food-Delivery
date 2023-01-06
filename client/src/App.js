import { Routes, Route } from "react-router-dom";
import Landing from "./Components/Landing/Landing";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register"
import Home from "./Components/Home/Home"
import Cart from "./Components/Cart/Cart";
import Account from "./Components/Account/Account";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/register" element={<Register/>}></Route>
      <Route path="/home" element={<Home/>}></Route>
      <Route path="/cart" element={<Cart/>}></Route>
      <Route path="/account" element={<Account/>}></Route>
    </Routes>
  );
}

export default App;
