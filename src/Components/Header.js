import React from "react";

class Header extends React.Component {

  render() {

    const { changeNumberOfRow, numberOfRows, movesCount,
      isFirstGame, toggleNewGame } = this.props;
    return (
      <>
        <h1 className="text-success title">2048</h1>
        <h4>Joindres les tuiles pour avoir 2048</h4>
        <p>Veuillez choisir le nombre de tuiles que vous désirez jouer avec...</p>
        <input
          id="rows"
          type="range"
          value={numberOfRows}
          min="2"
          max="24"
          name="rows"
          onChange={(e) => changeNumberOfRow(e.target.value)}
        />
        <label htmlFor="rows" className="offset ms-5">
          {numberOfRows} x {numberOfRows}
        </label>
        <br />
        <button
          className="btn btn-lg btn-success my-3"
          onClick={() => toggleNewGame()}
        >
          {isFirstGame ? "Débuter" : "Nouvelle Partie"}
        </button>
        <br />
        Nombre de mouvements : {movesCount}
      </>
    );
  }

}

export default Header;
