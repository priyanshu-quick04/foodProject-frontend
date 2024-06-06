import React from "react";
import { useCart, useDispatchCart } from "../components/ContextReducer";
import { Link } from "react-router-dom";

export default function Cart() {
  let data = useCart();
  console.log(data);
  let dispatch = useDispatchCart();
  if (data.length === 0) {
    return (
      <div
        className="vw-100 vh-100 d-flex justify-content-center align-items-center bg-info flex-column"
        style={{ filter: "opacity(0.8)" }}
      >
        <div className="text-white fs-2 fw-bold">
          The Cart is Empty !
          <br />
          {` Buy Something ;)`}
        </div>
        <div>
          <Link to="/">
            <button className="btn bg-danger mt-5 text-white fw-bold">
              Back to Home
            </button>
          </Link>
        </div>
      </div>
    );
  }
  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");
    let response = await fetch(
      "https://foodproject-backend-p695.onrender.com/api/orderData",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          order_data: data,
          email: userEmail,
          order_date: new Date().toDateString(),
        }),
      }
    );
    console.log(response.status);
    if (response.status === 200) {
      dispatch({ type: "DROP" });
    }
  };
  let totalPrice = data.reduce((total, food) => total + food.price, 0);
  return (
    <div>
      <div className="container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md">
        <table className="table table-hover">
          <thead className="text-success fs-4">
            <tr>
              <th scope="col">#</th>
              <th scope="col">
                <div className="d-flex justify-content-center">Name</div>
              </th>
              <th scope="col">
                <div className="d-flex justify-content-center">Quantity</div>
              </th>
              <th scope="col">
                <div className="d-flex justify-content-center">Option</div>
              </th>
              <th scope="col">
                <div className="d-flex justify-content-center">Amount</div>
              </th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => {
              return (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="d-flex justify-content-center">
                      {food.name}
                    </div>
                  </td>
                  <td>
                    <div className="d-flex justify-content-center">
                      {food.qty}
                    </div>
                  </td>
                  <td>
                    <div className="d-flex justify-content-center">
                      {food.size}
                    </div>
                  </td>
                  <td>
                    <div className="d-flex justify-content-center">
                      {food.price}
                    </div>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn p-0 border-2 rounded-2 border-danger px-2 py-1"
                      onClick={() => {
                        dispatch({ type: "REMOVE", index: index });
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div>
          <div className="fs-4 fw-bold">Total Price:{totalPrice}/-</div>
        </div>
        <div className="d-flex justify-content-between">
          <button
            className="btn bg-danger mt-5 text-white"
            onClick={handleCheckOut}
          >
            Check Out
          </button>
          <Link to="/">
            <button className="btn bg-primary mt-5 text-white">Back</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
