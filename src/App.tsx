import React, { useState, useEffect } from "react";
import "./App.css";
import MovieCard from "./components/MovieCard";

const App: React.FC = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    fetchMovies();
  }, [page]);

  const fetchMovies = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=${page}`
      );
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };
  const handlePrevPage = () => {
    setPage((prevPage) => prevPage - 1);
  };

  return (
    <div className="App">
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
            id={index}
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
            textAlign: "center",
            height: "80px",
            width: "100%",
          }}
        >
          <button
            style={
              page !== 1
                ? {
                    marginTop: "20px",
                    backgroundColor: "#071952",
                    height: "40px",
                    width: "80px",
                    color: "#FFFFFF",
                  }
                : {
                    marginTop: "20px",
                    backgroundColor: "lightgray",
                    height: "40px",
                    width: "80px",
                    color: "#FFFFFF",
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
            textAlign: "center",
            marginTop: "20px",
            height: "80px",
            width: "100%",
          }}
        >
          <button
            style={{
              backgroundColor: "#071952",
              height: "40px",
              width: "80px",
              color: "#FFFFFF",
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

export default App;
