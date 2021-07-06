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
      <label htmlFor="rows" className="offset ms-5">
        {state.numberOfRows} x {state.numberOfRows}
      </label>
      <br />
      <button
        className="btn btn-lg btn-success my-3"
        onClick={() => dispatch({ type: "NEW_GAME" })}
      >
        {state.isFirstGame ? "Débuter" : "Nouvelle Partie"}
      </button>
      <br />
      Nombre de mouvements : {state.movesCount}
    </>
  );
};

export default Header;
