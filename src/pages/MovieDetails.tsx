// MovieDetails.tsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

interface MovieDetailsParams {
  id: string;
}

interface Movie {
  title: string;
  overview: string;
  genres: Array<string>;
  rate: Number;
  url: string;
  releaseDate: string;
}

const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const apiKey = "f0e7c61a472fd0fd97de4d5073a24dfe";
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch movie details");
        }

        const data = await response.json();
        console.log("asdasd", data);
        setMovie({
          title: data.title,
          overview: data.overview,
          rate: data.vote_average,
          url: data.poster_path,
          releaseDate: data.release_date,
          genres: data.genres.map((genre: { name: string }) => genre.name),
        });
        console.log("s", movie);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  return (
    <div>
      <h1>Movie Details</h1>
      <p>Movie ID: {id}</p>
    </div>
  );
};

export default MovieDetails;
