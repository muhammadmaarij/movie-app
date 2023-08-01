import React, { useState, useEffect } from "react";
import "../App.css";
import MovieCard from "../components/MovieCard";

const HomePage: React.FC = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [sortBy, setSortBy] = useState<string>("popularity.desc");
  const [searchCriteria, setSearchCriteria] = useState<string>("");

  useEffect(() => {
    fetchMovies();
  }, [page, sortBy]);

  const fetchMovies = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?sort_by=${sortBy}&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=${page}`
      );
      const data = await response.json();
      setMovies(data.results);
      console.log(data.results);
    } catch (error) {
      console.log("dssds")
      console.error("Error fetching data:", error);
    }
  };

  const fetchMoviesSearch = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query=${searchCriteria}`
      );
      console.log(searchCriteria);
      const data = await response.json();
      setMovies(data.results);
      console.log(data.results);
    } catch (error) {
      console.log("dssds")
      console.error("Error fetching data:", error);
    }
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };
  const handlePrevPage = () => {
    setPage((prevPage) => prevPage - 1);
  };

  const headerStyles: React.CSSProperties = {
    textAlign: "center",
    height: "80px",
    width: "100%",
  };

  const buttonStyles: React.CSSProperties = {
    marginTop: "20px",
    height: "40px",
    width: "80px",
    color: "#FFFFFF",
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchCriteria(event.target.value);
  };

  return (
    <div className="App">
      <div style={{ padding: "20px", backgroundColor: "#35A29F", display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <input
            type="text"
            placeholder="Search movies by name, genre, release year, or language..."
            value={searchCriteria}
            onChange={handleSearch}
            style={{
              height: '40px', width: "380px", backgroundColor: "#35A29F", borderWidth: "2px",
              borderColor: '#071952', paddingLeft: '5px', color: 'white',
            }}
          />
          <button
            style={{
              backgroundColor: "#071952",
              height: "44px",
              width: "80px",
              color: "#FFFFFF",
            }}
            onClick={fetchMoviesSearch}
          >
            Search
          </button>
        </div>
      </div>


      <div
        style={{
          textAlign: "center",
          display: "flex",
          backgroundColor: "#35A29F",
          alignItems: "flex-end",
          justifyContent: "flex-end",
          paddingRight: "30px",
          paddingTop: "30px",
        }}
      >
        <label style={{
          fontWeight: "600",
          fontSize: "20px",
          color: '#071952'
        }}>
          Sort By:
          <select
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
              fetchMovies();
            }}
            style={{ marginLeft: "10px", backgroundColor: '#071952', color: '#FFFFFF', height: "30px" }}
          >
            <option value="popularity.desc">Popularity, high to low</option>
            <option value="popularity.asc">Popularity, low to high</option>
            <option value="primary_release_date.asc">Release, old to new</option>
            <option value="primary_release_date.desc">Release, new to old</option>
            <option value="vote_average.desc">Rating, high to low</option>
            <option value="vote_average.asc">Rating, low to high</option>
            <option value="vote_count.asc">Vote Count, low to high</option>
            <option value="vote_count.desc">Vote Count, high to low</option>
          </select>
        </label>
      </div>
      <div
        style={{
          backgroundColor: "#35A29F",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {movies.map((movie, index) => (
          <MovieCard
            id={movie.id}
            name={movie.title}
            imageUrl={movie.poster_path}
            overview={movie.overview}
            rating={movie.vote_average}
          />
        ))}
      </div>
      <div
        style={{
          backgroundColor: "#35A29F",
        }}
      >
        <div
          style={{
            ...headerStyles
          }}
        >
          <button
            style={
              page !== 1
                ? {
                  ...buttonStyles,
                  backgroundColor: "#071952",
                }
                : {
                  ...buttonStyles,
                  backgroundColor: "lightgray",
                }
            }
            disabled={page === 1}
            onClick={handlePrevPage}
          >
            Previous Page
          </button>
        </div>
        <div
          style={{
            ...headerStyles,
            marginTop: "20px",

          }}
        >
          <button
            style={{
              backgroundColor: "#071952",
              ...buttonStyles,
              marginTop: '0px'
            }}
            onClick={handleNextPage}
          >
            Next Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
