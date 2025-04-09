import React from "react";
import "../styles/HeroMovies.css";
import BatmanImage from "../img/batman-img.png";
import { CiHeart } from "react-icons/ci";

const HeroMovies = () => {
  return (
    <main className="hero-movies-section-container">
      <div className="movies-container">
        <div className="movies-wrapper">
          <div className="movie-card-container">
            <div className="movie-card">
              <div className="movie-card-image-container">
                <img src={BatmanImage}></img>
              </div>
              <div className="movie-name-container-landing-page">
                <div className="movie-name-wrapper-landing-page">
                  <h2>Batman</h2>
                </div>
              </div>
              <div className="movie-rating-container-landing-page">
                <div className="movie-rating-wrapper-landing-page">
                  <div className="imdb-box-container-landing-page">
                    <div className="imdb-box-landing-page">
                      <h3>imdb</h3>
                    </div>
                  </div>
                  <div className="rating-number-container-landing-page">
                    <p>7.8</p>
                  </div>
                </div>
              </div>

              <div className="movie-information-container-landing-page">
                <div className="movie-information-wrapper-landing-page">
                  <p>
                    2022 | 2h 58min | <br></br>
                    Action,Superhero
                  </p>
                </div>
              </div>

              <div className="add-to-list-container">
                <div className="add-to-list-wrapper">
                  <div className="add-to-list">
                    <div className="heart-icon-container">
                      <CiHeart className="heart-icon" />
                    </div>
                    <div className="watch-list-container">
                      <h3>Watchlist</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="movie-card-container">
            <div className="movie-card">
              <div className="movie-card-image-container">
                <img src={BatmanImage}></img>
              </div>
              <div className="movie-name-container-landing-page">
                <div className="movie-name-wrapper-landing-page">
                  <h2>Batman</h2>
                </div>
              </div>
              <div className="movie-rating-container-landing-page">
                <div className="movie-rating-wrapper-landing-page">
                  <div className="imdb-box-container-landing-page">
                    <div className="imdb-box-landing-page">
                      <h3>imdb</h3>
                    </div>
                  </div>
                  <div className="rating-number-container-landing-page">
                    <p>7.8</p>
                  </div>
                </div>
              </div>

              <div className="movie-information-container-landing-page">
                <div className="movie-information-wrapper-landing-page">
                  <p>
                    2022 | 2h 58min | <br></br>
                    Action,Superhero
                  </p>
                </div>
              </div>

              <div className="add-to-list-container">
                <div className="add-to-list-wrapper">
                  <div className="add-to-list">
                    <div className="heart-icon-container">
                      <CiHeart className="heart-icon" />
                    </div>
                    <div className="watch-list-container">
                      <h3>Watchlist</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="movie-card-container">
            <div className="movie-card">
              <div className="movie-card-image-container">
                <img src={BatmanImage}></img>
              </div>
              <div className="movie-name-container-landing-page">
                <div className="movie-name-wrapper-landing-page">
                  <h2>Batman</h2>
                </div>
              </div>
              <div className="movie-rating-container-landing-page">
                <div className="movie-rating-wrapper-landing-page">
                  <div className="imdb-box-container-landing-page">
                    <div className="imdb-box-landing-page">
                      <h3>imdb</h3>
                    </div>
                  </div>
                  <div className="rating-number-container-landing-page">
                    <p>7.8</p>
                  </div>
                </div>
              </div>

              <div className="movie-information-container-landing-page">
                <div className="movie-information-wrapper-landing-page">
                  <p>
                    2022 | 2h 58min | <br></br>
                    Action,Superhero
                  </p>
                </div>
              </div>

              <div className="add-to-list-container">
                <div className="add-to-list-wrapper">
                  <div className="add-to-list">
                    <div className="heart-icon-container">
                      <CiHeart className="heart-icon" />
                    </div>
                    <div className="watch-list-container">
                      <h3>Watchlist</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="circle-one-container">
        <div className="circle-one"></div>
      </div>
      <div className="circle-two-container">
        <div className="circle-two"></div>
      </div>
    </main>
  );
};

export default HeroMovies;
