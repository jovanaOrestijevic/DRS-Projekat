import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import RegistrationForm from "./components/RegistrationForm";
import RequireAuth from "./components/RequireAuth";
import MainPage from "./components/MainPage";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/" element={<LandingPage />} />

        <Route element={<RequireAuth />}>
          <Route path="/mainPage" element={<MainPage />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
