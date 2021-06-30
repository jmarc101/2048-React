import React from "react";
import "../App.css";

const Header = (props) => {
  // Deconstructing reducer
  const { state, dispatch } = props.reducer;

  return (
    <>
      <h1 className="text-success title">2048</h1>
      <h4>Joindres les tuiles pour avoir 2048</h4>
      <p>Veuillez choisir le nombre de tuiles que vous désirez jouer avec...</p>
      <input
        id="rows"
        type="range"
        value={state.numberOfRows}
        min="2"
        max="24"
        name="rows"
        onChange={(e) =>
          dispatch({ type: "CHANGE_ROW_VALUE", payload: e.target.value })
        }
      />
      <h4>
        {state.numberOfRows} x {state.numberOfRows}
      </h4>
      <br />

      {/* Start game Button */}
      <button
        className="btn btn-success my-3 me-5"
        onClick={() => dispatch({ type: "NEW_GAME" })}
      >
        {state.isFirstGame ? "Débuter" : "Nouvelle Partie"}
      </button>
      {/* DeBUG BUTTON */}
      <button
        className="btn btn-success my-3"
        onClick={() => dispatch({ type: "DEBUG" })}
      >
        Debug Generate random tile
      </button>
    </>
  );
};

export default Header;
