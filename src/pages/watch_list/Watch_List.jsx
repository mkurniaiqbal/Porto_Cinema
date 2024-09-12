import { useEffect, useState } from "react";
import Card from "../../components/card/Card";
import Navbar from "../../components/navbar/Navbar";
import { useNavigate } from "react-router-dom";

function WatchList() {
  const Navigate = useNavigate();
  const [watchList, setWatchList] = useState([]);

  function getLocalStorage() {
    const savedWatchList = localStorage.getItem("WatchList");
    const getUsername = localStorage.getItem("username");
    if (savedWatchList) {
      // Asumsikan data yang disimpan adalah string JSON yang bisa diuraikan
      setWatchList(JSON.parse(savedWatchList));
    }
    if (!getUsername) {
      Navigate("/login");
    }
  }

  useEffect(() => {
    getLocalStorage();
  }, []);

  return (
    <>
      <section>
        <Navbar />
      </section>
      <section>
        <Card films={watchList} headerCard="Your Watchlist" />
      </section>
    </>
  );
}

export default WatchList;
