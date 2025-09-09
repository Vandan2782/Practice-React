import { Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AuthPage from "./pages/authPage";
import Table from "./pages/table";

function App() {
  return (
    <div>
      <nav>
        <Link to="/login">Login</Link> | <Link to="/signup">Signup</Link> | <Link to='authPage'>Authpage</Link>
      </nav>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
         <Route path="/authPage" element={<AuthPage/>} />
          <Route path="/table" element={<Table/>} />
      </Routes>
      {/* <AuthPage/> */}
      <Table/>
    </div>
  );
}

export default App;
