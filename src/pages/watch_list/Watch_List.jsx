import { useEffect, useState } from "react";
import Card from "../../components/card/Card";
import Navbar from "../../components/navbar/Navbar";

function WatchList() {
  const [watchList, setWatchList] = useState([]);

  function getLocalStorage() {
    const savedWatchList = localStorage.getItem("WatchList");
    if (savedWatchList) {
      // Asumsikan data yang disimpan adalah string JSON yang bisa diuraikan
      setWatchList(JSON.parse(savedWatchList));
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
