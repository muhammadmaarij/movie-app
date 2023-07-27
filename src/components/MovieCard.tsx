import React, { useState } from "react";
import "../styles/MovieCardStyles.css";

interface MovieCardProps {
  name: string;
  imageUrl: string;
  rating: number;
  overview: string;
}

const MovieCard: React.FC<MovieCardProps> = ({
  name,
  imageUrl,
  rating,
  overview,
}) => {
  const [isHovered, setIsHovered] = useState<Boolean>(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
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
      <div>
        <img src={imageUrl} alt={name} className="movie-image" />
        <div className="movie-details">
          <h4 className="movie-name">{name}</h4>
          <div className="div-rating">
            <p className="movie-rating">{rating}</p>
          </div>
        </div>
      </div>
      {isHovered && (
        <div className="div-overview">
          <p className="overview-text">Overview: </p>
          <p className="movie-overview">{overview}</p>
        </div>
      )}
    </div>
  );
};

export default MovieCard;
