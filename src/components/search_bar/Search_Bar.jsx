// src/components/SearchBar.jsx
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchMovies, clearSearchResults } from "../../store/movie/Movie.jsx";
import CardSlider from "../card_slider/Card_Slider.jsx";

// Komponen utama yang menggabungkan semua fungsi kecil
function SearchBar() {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [fixSearch, setFixSearch] = useState("");

  const { totalResults, searchResults } = useSelector((state) => state.movies);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFixSearch("");
    }
  }, [searchTerm]);

  const handleSearch = (e) => {
    e.preventDefault();
    setFixSearch(searchTerm);

    if (searchTerm.trim() === "") {
      dispatch(clearSearchResults());
    } else {
      dispatch(searchMovies(searchTerm));
    }
  };

  return (
    <>
      <SearchInput
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSearch={handleSearch}
      />
      <SearchResults
        totalResults={totalResults}
        searchResults={searchResults}
      />
      <NoResults
        searchTerm={searchTerm}
        totalResults={totalResults}
        searchResults={searchResults}
        fixSearch={fixSearch}
      />
    </>
  );
}

// Fungsi untuk menangani input pencarian
function SearchInput({ searchTerm, setSearchTerm, handleSearch }) {
  return (
    <section className="search-section container">
      <form onSubmit={handleSearch} className="d-flex justify-content-end mt-3">
        <input
          type="text"
          className="form-control w-25"
          placeholder="Search . . ."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="btn bg-info ms-1 custom-btn-search" type="submit">
          Search
        </button>
      </form>
    </section>
  );
}

// Fungsi untuk menampilkan hasil pencarian
function SearchResults({ totalResults, searchResults }) {
  if (totalResults > 0 && searchResults.length > 0) {
    return (
      <section>
        <CardSlider
          films={searchResults}
          className={"mt-4"}
          headerCard={"Search Results"}
        />
      </section>
    );
  }
  return null;
}

// Fungsi untuk menampilkan pesan ketika tidak ada hasil yang ditemukan
function NoResults({ searchTerm, totalResults, searchResults, fixSearch }) {
  if (
    fixSearch !== "" &&
    totalResults === 0 &&
    searchResults.length === 0 &&
    searchTerm.trim() !== ""
  ) {
    return (
      <section className="d-flex justify-content-center mt-4">
        <h3>No results found for "{fixSearch}".</h3>
      </section>
    );
  }
  return null;
}

export default SearchBar;
