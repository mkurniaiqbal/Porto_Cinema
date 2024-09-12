// App.jsx
import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import Detail from "./pages/detail/Detail.jsx";
import WatchList from "./pages/watch_list/Watch_List.jsx";
import FavoriteList from "./pages/favorite/Favorite.jsx";
import Login from "./pages/login/Login.jsx";

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/watch-list" element={<WatchList />} />
          <Route path="/Favorite-list" element={<FavoriteList />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
