import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MyOrder() {
  const [orderData, setOrderData] = useState({});
  const fetchMyOrder = async () => {
    try {
      let response = await fetch(
        "https://foodproject-backend-p695.onrender.com/api/myOrderData",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: localStorage.getItem("userEmail") }),
        }
      );
      let output = await response.json();
      console.log(output);
      setOrderData(output);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchMyOrder();
  }, []);
  console.log("Hello");
  console.log(orderData);
  return (
    <>
      <div>
        <Navbar />
      </div>
      {/* <div className="container">
        <div className="row">
          {Object.keys(orderData).length !== 0 ? (
            Array(orderData).map((data) => {
              return data.orderData
                ? data.orderData.order_data
                    .slice(0)
                    .reverse()
                    .map((item) => {
                      return item.map((arrayData) => {
                        return (
                          <div className="container">
                            <div className="row">
                              {arrayData.Order_date ? (
                                <div className="m-auto mt-5">
                                  {(data = arrayData.Order_date)}
                                  <hr />
                                </div>
                              ) : (
                                <div className="col col-12 col-md-6 col-lg-3">
                                  <div
                                    className="card mt-3"
                                    style={{
                                      width: "16rem",
                                      maxHeight: "360px",
                                    }}
                                  >
                                    <div className="card-body col">
                                      <h5 className="card-title">
                                        {arrayData.name}
                                      </h5>
                                      <div
                                        className="container w-100 p-0 col col-12 col-md-6 col-lg-3"
                                        style={{ height: "38px" }}
                                      >
                                        <span className="m-1">
                                          {arrayData.qty}
                                        </span>
                                        <span className="m-1">
                                          {arrayData.size}
                                        </span>
                                        <div className="d-inline ms-2 h-100 w-20 fs-5">
                                          ₹{arrayData.price}/-
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      });
                    })
                : "";
            })
          ) : (
            <div>No data order</div>
          )}
        </div>
      </div> */}
      <div className="container">
        <div className="row">
          {Object.keys(orderData).length !== 0
            ? Array(orderData).map((data) => {
                return data.orderData
                  ? data.orderData.order_data
                      .slice(0)
                      .reverse()
                      .map((item, index) => {
                        return (
                          <div key={index} className="container">
                            <div className="row">
                              {item.map((arrayData, i) => {
                                return (
                                  <React.Fragment key={i}>
                                    {arrayData.Order_date ? (
                                      <div className="col-12">
                                        <div className="m-auto mt-5">
                                          {(data = arrayData.Order_date)}
                                          <hr />
                                        </div>
                                      </div>
                                    ) : (
                                      <div className="col-12 col-md-6 col-lg-4 mb-3">
                                        <div
                                          className="card mt-3"
                                          style={{
                                            width: "100%",
                                            maxHeight: "360px",
                                          }}
                                        >
                                          <div className="card-body">
                                            <h5 className="card-title">
                                              {arrayData.name}
                                            </h5>
                                            <div className="container w-100 p-0">
                                              <div className="d-flex ">
                                                <span className="d-block mx-1">
                                                  {arrayData.qty}
                                                </span>
                                                <span className="d-block">
                                                  {arrayData.size}
                                                </span>
                                              </div>
                                              <div className="d-inline ms-2 h-100 w-20 fs-5">
                                                ₹{arrayData.price}/-
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                  </React.Fragment>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })
                  : "";
              })
            : "Nothing to show here"}
        </div>
      </div>

      <div>
        <Footer />
      </div>
    </>
  );
}
