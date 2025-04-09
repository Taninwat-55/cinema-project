import React from "react";
import "../styles/MovieDetailsSideBar.css";
import { IoMenu } from "react-icons/io5";

const MovieDetailsSideBar = () => {
  return (
    <div className="movie-details-sidebar-container">
      <div className="sidebar-hamburger-menu-container">
        <IoMenu className="hamburger-menu-icon" />
      </div>
    </div>
  );
};

export default MovieDetailsSideBar;
