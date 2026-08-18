import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Gallery from "./pages/Gallery";
import Upload from "./pages/Upload";
import MobileNav from "./components/MobileBottomNav";
import About from "./pages/About";


import ProtectedRoute from "./components/ProtectedRoute";
import Birthdays from "./pages/Birthday";


function App() {
  return (
    <>
    <Routes>

      {/* PUBLIC */}
      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/gallery"
        element={<Gallery />}
      />

      <Route
        path="/birthdays"
        element={<Birthdays />}
      />    

      <Route
        path="/about"
        element={<About />}
      />



      {/* PRIVATE */}
      <Route
        path="/upload"
        element={
          <ProtectedRoute>
            <Upload />
          </ProtectedRoute>
        }
      />

    </Routes>
    <MobileNav />
    </>
  );
}

export default App;