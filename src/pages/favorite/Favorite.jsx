import { useEffect, useState } from "react";
import Card from "../../components/card/Card";
import Navbar from "../../components/navbar/Navbar";

function FavoriteList() {
  const [favoriteList, setFavoriteList] = useState([]);

  function getLocalStorageFavoriteList() {
    const savedFavoriteList = localStorage.getItem("FavoriteList");
    if (savedFavoriteList) {
      // Asumsikan data yang disimpan adalah string JSON yang bisa diuraikan
      setFavoriteList(JSON.parse(savedFavoriteList));
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
