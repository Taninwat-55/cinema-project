import React from "react";
import "../styles/MovieInformation.css";
import CarImage from "../img/car-image.png";

const MovieInformation = () => {
  return (
    <div className="movie-information-container">
      <div className="movie-information-wrapper-image">
        <img src={CarImage}></img>
      </div>

      <div className="movie-information-container-text">
        <div className="movie-information-wrapper-text">
          <div className="movie-name-container">
            <div className="movie-name-wrapper">
              <div className="movie-name-text">
                <h1>Cars 2</h1>
              </div>

              <div className="movie-rating-container">
                <div className="imdb-box-container">
                  <div className="imdb-box">
                    <h3>imdb</h3>
                  </div>
                </div>
                <div className="rating-number-container">
                  <p>6.2</p>
                </div>
              </div>
            </div>
          </div>

          <div className="movie-genre">
            <div className="movie-genre-wrapper">
              <p>2001 | 1h 46min | Animation, Family</p>
            </div>
          </div>

          <div className="story-line-header-container">
            <div className="story-line-header-wrapper">
              <h2>Storyline</h2>
            </div>
          </div>

          <div className="story-line-text-container">
            <div className="story-line-text-wrapper">
              <p>
                Lightning McQueen and Mater travel the world for the World Grand
                Prix, but their journey takes a wild turn when Mater gets caught
                up in an intenrational spy mission. As the adventure unfolds ,
                Lighting faces tough competition while disovering the true
                meaning of friendship.{" "}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="buy-ticket-button-container">
        <div className="buy-ticket-button-wrapper">
          <button>Buy Tickets</button>
        </div>
      </div>
    </div>
  );
};

export default MovieInformation;
