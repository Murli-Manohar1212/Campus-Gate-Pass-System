// App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import Register from "./page/Register";
import ExitGate from "./page/ExitGate";
import EnterGate from "./page/EnterGate";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path = "/login" element = {<ExitGate/>} />
        <Route path = "/logout" element = {<EnterGate/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

