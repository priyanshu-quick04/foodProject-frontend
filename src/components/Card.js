import React, { useRef, useState, useEffect } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";

export default function Card({ fooditem, options }) {
  let dispatch = useDispatchCart();
  let data = useCart();
  const priceRef = useRef();
  let priceOptions = Object.keys(options);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const handleAddToCart = async () => {
    let food = [];
    for (const item of data) {
      if (item.id === fooditem._id) {
        food = item;
        break;
      }
    }
    if (food.length !== 0) {
      if (food.size === size) {
        await dispatch({
          type: "UPDATE",
          id: fooditem._id,
          price: finalPrice,
          qty: qty,
        });
        return;
      }
    }
    await dispatch({
      type: "ADD",
      id: fooditem._id,
      name: fooditem.name,
      price: finalPrice,
      qty: qty,
      size: size,
    });
    console.log(data);
  };
  let finalPrice = qty * parseInt(options[size]);
  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);
  return (
    <div>
      <div
        className="card"
        style={{
          width: "18rem",
          maxHeight: "360px",
          marginTop: "2rem",
        }}
      >
        <div
          style={{
            width: "18rem",
            maxHeight: "360px",
            overflow: "hidden",
          }}
        >
          <img
            src={fooditem.img}
            className="card-img-top"
            alt="..."
            style={{ height: "230px" }}
          />
        </div>
        <div className="card-body">
          <h5 className="card-title">{fooditem.name}</h5>
          <div className="d-flex container w-100">
            <select
              className="m-2 h-100 bg-success text-white rounded-2"
              onChange={(e) => {
                setQty(e.target.value);
              }}
            >
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1} className="text-white">
                    {i + 1}
                  </option>
                );
              })}
            </select>
            <select
              className="m-2 h-100 bg-success text-white rounded-2"
              ref={priceRef}
              onChange={(e) => {
                setSize(e.target.value);
              }}
            >
              {priceOptions.map((data) => {
                return (
                  <option key={data} value={data}>
                    {data}
                  </option>
                );
              })}
            </select>
            <div className="m-2 fs-6 fw-bold">₹{finalPrice}/-</div>
          </div>
          <hr />
          <button
            className="btn btn-success justify-center ms-2"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
