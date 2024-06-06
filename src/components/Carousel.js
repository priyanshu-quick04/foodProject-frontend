import React from "react";
import salad from "../images/salad.jpg";
import burger from "../images/burger.jpg";
import pizza from "../images/pizza.jpg";

export default function Carousel() {
  return (
    <div>
      <div id="carouselExampleFade" className="carousel slide carousel-fade">
        <div className="carousel-inner">
          <div
            className="carousel-caption d-none d-md-block"
            style={{ zIndex: "10" }}
          >
            <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-success" type="submit">
                Search
              </button>
            </form>
          </div>
          <div className="carousel-item active">
            <img
              src={salad}
              className="d-block w-100"
              alt="..."
              style={{ filter: "brightness(50%)" }}
            />
          </div>
          <div className="carousel-item">
            <img
              src={pizza}
              className="d-block w-100"
              alt="..."
              style={{ filter: "brightness(50%)" }}
            />
          </div>
          <div className="carousel-item">
            <img
              src={burger}
              className="d-block w-100"
              alt="..."
              style={{ filter: "brightness(50%)" }}
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}
