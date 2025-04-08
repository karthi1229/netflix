import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import TVShows from "./pages/TVShows/TVShow";
import Movies from "./pages/Movies/Movies";
import NewPopular from "./pages/NewPopular/NewPopular";
import MyList from "./pages/MyList/MyList";
import BrowseByLanguages from "./pages/BrowseByLanguages/BrowseByLanguages";
import Login from "./pages/Login/Login";
import Player from "./pages/Player/Player";
import SearchResults from "./pages/SearchResults/SearchResults";
import Anime from "./pages/Anime/Anime";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [savedItems, setSavedItems] = useState([]);
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("myList")) || [];
    setSavedItems(storedItems);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const publicPaths = ["/login", "/forgot-password"];

      // only redirect if the current path is protected
      if (!user && !publicPaths.includes(location.pathname)) {
        console.log("Logged out");
        navigate("/login");
      } else {
        console.log("Logged In");
      }
      setIsAuthChecked(true);
    });

    return () => unsubscribe();
  }, [navigate, location.pathname]);

  const handleSave = (item) => {
    if (!savedItems.some((savedItem) => savedItem.id === item.id)) {
      const updatedList = [...savedItems, item];
      setSavedItems(updatedList);
      localStorage.setItem("myList", JSON.stringify(updatedList));
    }
  };

  const handleRemove = (id) => {
    const updatedList = savedItems.filter((item) => item.id !== id);
    setSavedItems(updatedList);
    localStorage.setItem("myList", JSON.stringify(updatedList));
  };

  if (!isAuthChecked) return null; // prevent premature rendering before auth check

  return (
    <>
      <ToastContainer theme="dark" />
      {/* Only show navbar on protected pages */}
      {!["/login", "/forgot-password"].includes(location.pathname) && <Navbar />}
      
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Protected Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/tvshows" element={<TVShows />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/new-popular" element={<NewPopular onSave={handleSave} />} />
        <Route path="/my-list" element={<MyList savedItems={savedItems} onRemove={handleRemove} />} />
        <Route path="/browse-languages" element={<BrowseByLanguages />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/anime" element={<Anime />} />
        <Route path="/player/:id" element={<Player />} />
      </Routes>
    </>
  );
};

export default App;
