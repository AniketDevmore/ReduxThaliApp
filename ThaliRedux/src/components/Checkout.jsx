import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AddToThali,
  ReduceIteamInThali,
  RemoveIteamFromThali,
} from "../slices/thaliSlice";
import "./Checkout.css";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const [totalAmt, setTotalAmt] = useState(0);
  const [taxAmt, setTaxAmt] = useState(0);
  const [flag, setFlag] = useState(false);
  const globalState = useSelector((state) => state.thaliSlice.iteams);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const reduceQtyHandler = (ele) => {
    if (ele.qty >= 0) {
      dispatch(ReduceIteamInThali(ele));
    }
  };
  const addQtyHandler = (ele) => {
    dispatch(AddToThali(ele));
  };

  const removeFromThaliHandle = (data) => {
    dispatch(RemoveIteamFromThali(data));
  };

  const IteamTotal = (price, qty) => {
    return Math.ceil(Number(price) * Number(qty));
  };

  const subTotal = () => {
    let total = globalState.reduce(
      (sum, ele) => sum + Number(ele.price) * Number(ele.qty),
      0
    );
    setTotalAmt(Math.ceil(total));
  };
  const calcTax = () => {
    let total = globalState.reduce(
      (sum, ele) => sum + Number(ele.price) * Number(ele.qty),
      0
    );
    setTaxAmt(Math.ceil(total * 0.2));
  };
  useEffect(() => {
    subTotal();
    calcTax();
  }, [globalState]);

  const alertHandle = () => {
    // console.log(globalState);

    if (globalState.length < 2) {
      setFlag(true);
    } else {
      setFlag(false);
      alert(
        `Your order for ₹${
          totalAmt + taxAmt
        } is confirmed.\n Your order will arrive soon!`
      );
    }
  };

  const backHandler = () => {
    navigate("/");
  };
  return (
    <div>
      {globalState.length <= 0 ? (
        <div style={{ marginTop: "40px", color: "#B3005E" }}>
          <h1>Your Thali is Empty!</h1>
          <h6>Please add iteams in your thali!</h6>
          <button onClick={backHandler} className="btn btn-danger">
            ← Back
          </button>
        </div>
      ) : (
        <div>
          <div style={{ textAlign: "right" }}>
            <button onClick={backHandler} className="btn btn-danger">
              ← Back
            </button>
          </div>
          <table style={{ textAlign: "left" }} className="table table-striped">
            <thead id="checkThead">
              <tr>
                <th scope="col">Iteams</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Total</th>
              </tr>
            </thead>
            <tbody id="ckeckBody">
              {globalState.map((ele, i) => (
                <tr key={i}>
                  <td id="checkTd">
                    <img id="thaliImg" src={ele.img} alt="img" />
                    <h1
                      style={{ marginLeft: "10px", paddingTop: "20px" }}
                      id="thaliIteam"
                    >
                      {ele.name}{" "}
                      <button
                        onClick={() => removeFromThaliHandle(ele)}
                        className="btn btn-light"
                        style={{ margin: "4px" }}
                      >
                        <img
                          style={{ width: "20px", height: "20px" }}
                          src="https://cdn-icons-png.flaticon.com/512/860/860829.png"
                          alt="remove"
                        />
                      </button>
                    </h1>
                  </td>
                  <td>
                    <h3 id="thaliPrice">₹{ele.price}</h3>
                  </td>
                  <td style={{ fontWeight: "900", paddingTop: "30px" }}>
                    <button
                      style={{ padding: "0 4px", marginRight: "5px" }}
                      className="btn btn-secondary"
                      onClick={() => reduceQtyHandler(ele)}
                    >
                      -
                    </button>
                    {ele.qty}
                    <button
                      style={{ padding: "0 2px", marginLeft: "5px" }}
                      className="btn btn-secondary"
                      onClick={() => addQtyHandler(ele)}
                    >
                      +
                    </button>
                  </td>
                  <td
                    style={{
                      fontSize: "1.3rem",
                      color: "rgb(95, 3, 3)",
                      paddingTop: "30px",
                    }}
                  >
                    ₹{IteamTotal(ele.price, ele.qty)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ textAlign: "right" }}>
            <div id="checkout">
              <h4>
                Subtotal: <span>{totalAmt}</span>
              </h4>
              <hr />
              <h4>
                Sales tax: <span>{taxAmt}</span>
              </h4>
              <hr />
              <h3>
                Grand total: <span>{totalAmt + taxAmt}</span>
              </h3>
              <hr />

              <button onClick={alertHandle} className="btn btn-success">
                Checkout ₹{totalAmt + taxAmt}
              </button>
              {flag ? (
                <p style={{ color: "red", fontSize: "1.2rem" }}>
                  Need two iteams to checkout!
                </p>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
