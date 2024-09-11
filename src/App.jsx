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

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/wacth-list" element={<WatchList />} />
          <Route path="/Favorite-list" element={<FavoriteList />} />
          {/* <Route path="/about" element={<About />} />
          <Route path="/user/:userId" element={<User />} />
          <Route path="*" element={<Navigate to="/" />} /> */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
