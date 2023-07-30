import React, { useState } from "react";
import "../styles/MovieCardStyles.css";
import { Link } from "react-router-dom";

interface MovieCardProps {
  id: number;
  name: string;
  imageUrl: string;
  rating: number;
  overview: string;
}

const MovieCard: React.FC<MovieCardProps> = ({
  id,
  name,
  imageUrl,
  rating,
  overview,
}) => {
  const [isHovered, setIsHovered] = useState<Boolean>(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    console.log(overview.length);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className="movie-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link to={`/movie/${id}`}>
        <div>
          <img
            src={`https://image.tmdb.org/t/p/w500/${imageUrl}`}
            alt={name}
            className="movie-image"
          />
          <div className="movie-details">
            <h4 className="movie-name">{name}</h4>
            <div className="div-rating">
              <p
                className="movie-rating"
                style={rating > 7 ? { color: "lightgreen" } : { color: "red" }}
              >
                {rating}
              </p>
            </div>
          </div>
        </div>
      </Link>
      {isHovered && (
        <div
          className="div-overview"
          style={
            overview.length > 330
              ? { top: "80px", height: "300px" }
              : overview.length > 240
              ? { top: "150px", height: "230px" }
              : { top: "180px", height: "200px" }
          }
        >
          <p className="overview-text">Overview: </p>
          <p className="movie-overview">{overview}</p>
        </div>
      )}
    </div>
  );
};

export default MovieCard;
