import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import salad from "../images/salad.jpg";
import burger from "../images/burger.jpg";
import pizza from "../images/pizza.jpg";

export default function Home() {
  const [search, setSearch] = useState("");
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    let response = await fetch(
      "https://foodproject-backend-p695.onrender.com/api/foodData",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    response = await response.json();
    setFoodCat(response[1]);
    setFoodItem(response[0]);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div>
        <div id="carouselExampleFade" className="carousel slide carousel-fade">
          <div className="carousel-inner">
            <div
              className="carousel-caption d-none d-md-block"
              style={{ zIndex: "10" }}
            >
              <div className="d-flex justify-content-center">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
              </div>
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
      <div className="container">
        {foodCat.length !== 0 ? (
          foodCat.map((data) => {
            return (
              <div className="row">
                <div key={data._id} className="fs-3 m-2">
                  {data.CategoryName}
                </div>
                <hr />
                {foodItem.length !== 0 ? (
                  foodItem
                    .filter(
                      (item) =>
                        item.CategoryName === data.CategoryName &&
                        item.name.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((filterItem) => {
                      return (
                        <div
                          key={filterItem._id}
                          className="col-12 col-md-6 col-lg-4"
                        >
                          <Card
                            fooditem={filterItem}
                            options={filterItem.options[0]}
                          />
                        </div>
                      );
                    })
                ) : (
                  <div>No data Found</div>
                )}
              </div>
            );
          })
        ) : (
          <div>Hello</div>
        )}
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}
