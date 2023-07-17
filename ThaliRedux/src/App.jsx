import "./App.css";
import { Link } from "react-router-dom";
import Thali from "./components/Thali";
import { useSelector } from "react-redux";

function App() {
  const globalState = useSelector((state) => state.thaliSlice.iteams);
  // console.log(globalState);
  return (
    <div className="App">
      <header>
        <h1 id="header">Food at Door</h1>
      </header>
      <nav id="navbar">
        <ul id="navUl">
          <li id="navLi">
            <Link id="thaliLink" to={`checkout`}>
              {/* Thali */}{" "}
              <img
                style={{
                  width: "40px",
                  height: "40px",
                  margin: "4px",
                  paddingBottom: "5px",
                }}
                src="https://images.emojiterra.com/google/noto-emoji/v2.034/512px/1f372.png"
                alt="food"
              />
              {globalState.length ? (
                <span id="notify">{globalState.length}</span>
              ) : (
                <></>
              )}
            </Link>
          </li>
        </ul>
      </nav>

      <Thali />
      <footer style={{ margin: "0" }}>
        <p>@CopyRight to Aniket Devmore</p>
      </footer>
    </div>
  );
}

export default App;
