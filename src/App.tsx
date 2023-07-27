import React from "react";
import logo from "./logo.svg";
import "./App.css";
import MovieCard from "./components/MovieCard";

function App() {
  return (
    <div className="App">
      <div style={{ backgroundColor: "red" }}>
        <MovieCard
          name={"Fast And Furious 8"}
          imageUrl="https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg"
          overview="Overviewewhttps://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpge"
          rating={8.123}
        />
      </div>
    </div>
  );
}

export default App;
