// MovieDetails.tsx
import React, { useEffect, useState } from "react";
import "../styles/MovieDetailStyles.css";
import { useParams, Link } from "react-router-dom";

interface MovieDetailsParams {
  id: string;
}

interface Movie {
  title: string;
  overview: string;
  genres: Array<string>;
  rating: Number;
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
          rating: data.vote_average,
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
    <div className="movie-card-detail">
      <div>
        <h4 className="movie-name-detail">{movie?.title}</h4>
        <p className="movie-year-detail">
          {movie?.releaseDate.substring(0, 4)}
        </p>
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie?.url}`}
          alt={movie?.title}
          className="movie-image-detail"
        />

        <div className="genre-row">
          {movie?.genres.map((genre, index) => (
            <div key={index} className="genre">
              {genre}
            </div>
          ))}
        </div>
        <div className="movie-details-detail">
          <div className="div-rating-detail">
            <p className="movie-rating-detail">{movie?.rating.toString()}</p>
          </div>
        </div>
      </div>

      <div className="div-overview-detail" style={{}}>
        <p className="overview-text-detail">Overview: </p>
        <p className="movie-overview-detail">{movie?.overview}</p>
      </div>
    </div>
  );
};

export default MovieDetails;
