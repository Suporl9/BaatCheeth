import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./Components/Login";
import { SignUp } from "./Components/SignUp";
import GlobalStyles from "./GlobalStyles/globalStyles";
import { DisplayMain } from "./Components/DisplayMain";
function App() {
  return (
    <>
      <GlobalStyles />
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          {/* <Route path="/channel" element={<DisplayMain />} /> */}
          <Route path="/channel/:id" element={<DisplayMain />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
