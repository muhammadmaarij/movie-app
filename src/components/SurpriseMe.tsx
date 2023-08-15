// MovieDetails.tsx
import React, { useEffect, useState } from "react";
import "../styles/MovieDetailStyles.css";
import { useParams, Link } from "react-router-dom";
import nullImage from "../assets/images/null.jpg";

interface MovieDetailsParams {
    id: number;
}

interface Movie {
    title: string;
    overview: string;
    genres: Array<string>;
    rating: number;
    url: string;
    releaseDate: string;
}

const SurpriseMe: React.FC<MovieDetailsParams> = ({ id }) => {


    const [movie, setMovie] = useState<Movie | null>(null);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const apiKey = "f0e7c61a47jlklk2fd0fd97de234d5073a24ewdfe";
                const response = await fetch(
                    `https://api.themoviedb.org/3/movie/${id.toString()}?api_key=${apiKey}`
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch movie details");
                }

                const data = await response.json();
                setMovie({
                    title: data.title,
                    overview: data.overview,
                    rating: data.vote_average,
                    url: data.poster_path,
                    releaseDate: data.release_date,
                    genres: data.genres.map((genre: { name: string }) => genre.name),
                });
            } catch (error) {
                console.error("Error fetching movie details:", error);
            }
        };

        fetchMovieDetails();
    }, [id]);

    const getRatingColor = (rating: number) => {
        return rating < 7 ? "red" : "lightgreen";
    };

    return (
        <div >
            <div>
                <h4 className="movie-name-detail">{movie?.title}</h4>
                <p className="movie-year-detail">
                    {movie?.releaseDate.substring(0, 4)}
                </p>
                <div className="image-overview">
                    <img
                        src={
                            movie?.url
                                ? `https://image.tmdb.org/t/p/w500/${movie?.url}`
                                : nullImage
                        }
                        alt={movie?.title}
                        className="movie-image-detail"
                    />
                    <div className="div-overview-detail" style={{}}>
                        <p className="movie-rating-detail" style={{
                            color: movie?.rating ? getRatingColor(movie.rating) : "lightgreen",
                        }} >⭐{movie?.rating.toString()}</p>
                        <p className="overview-text-detail">Overview: </p>
                        <p className="movie-overview-detail">{movie?.overview}</p>
                    </div>
                </div>

                <div className="genre-row">
                    {movie?.genres.map((genre, index) => (
                        <div key={index} className="genre">
                            {genre}
                        </div>
                    ))}
                </div>

            </div>


        </div>
    );
};

export default SurpriseMe;
