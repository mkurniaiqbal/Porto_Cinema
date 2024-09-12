import { useEffect, useState } from "react";
import Card from "../../components/card/Card";
import Navbar from "../../components/navbar/Navbar";
import { useNavigate } from "react-router-dom";

function FavoriteList() {
  const Navigate = useNavigate();
  const [favoriteList, setFavoriteList] = useState([]);

  function getLocalStorageFavoriteList() {
    const savedFavoriteList = localStorage.getItem("FavoriteList");
    const getUsername = localStorage.getItem("username");
    if (savedFavoriteList) {
      // Asumsikan data yang disimpan adalah string JSON yang bisa diuraikan
      setFavoriteList(JSON.parse(savedFavoriteList));
    }
    if (!getUsername) {
      Navigate("/login");
    }
  }

  useEffect(() => {
    getLocalStorageFavoriteList();
  }, []);

  return (
    <>
      <section>
        <Navbar />
      </section>
      <section>
        <Card films={favoriteList} headerCard="Your Favorite" />
      </section>
    </>
  );
}

export default FavoriteList;
