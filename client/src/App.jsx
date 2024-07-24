import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import About from "./pages/About.jsx";
import Home from "./pages/Home.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Profile from "./components/Profile.jsx";
import CreateNote from "./pages/CreateNote.jsx";
import NoteDetail from "./pages/NoteDetail.jsx";
import UpdateNote from "./pages/UpdateNote.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route path="/notes/:id" element={<NoteDetail />} />
        <Route path="/update-note/:id" element={<UpdateNote />} />

        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/create-note" element={<CreateNote />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
