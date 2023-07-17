import React from "react";
import "./Thali.css";
import Iteams from "./Iteams.json";
import { useDispatch, useSelector } from "react-redux";
import { AddToThali, ReduceIteamInThali } from "../slices/thaliSlice";

const Thali = () => {
  const dispatch = useDispatch();
  const globalState = useSelector((state) => state.thaliSlice.iteams);

  const cartThaliBtnHandler = (iteam) => {
    dispatch(ReduceIteamInThali(iteam));
  };

  const clickHandle = (iteam) => {
    dispatch(AddToThali({ ...iteam, qty: 1 }));
  };

  return (
    <div>
      <div id="cartThalDiv">
        <ul id="cartThaliUl">
          {globalState.map((ele, i) => (
            <li key={i} id="cartThaliLi">
              <img id="cartThaliImg" src={ele.img} alt="img" />
              <button
                id="cartThaliBtn"
                onClick={() => cartThaliBtnHandler(ele)}
              >
                X
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <ul id="thaliUl">
          {Iteams.map((ele, i) => (
            <li key={i} id="thaliLi">
              <h1 id="thaliIteam">{ele.name}</h1>
              <img id="thaliImg" src={ele.img} alt="img" />
              <h3 id="thaliPrice">Price: ₹{ele.price}</h3>

              <button
                onClick={() => clickHandle(ele)}
                className="btn btn-secondary"
              >
                Add to Thali
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Thali;
