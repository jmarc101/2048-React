import React, {useReducer} from "react";
import {defaultState, AppReducer} from './Components/AppReducer'
import "./App.css";
import Board from "./Components/Board";
import Header from './Components/Header'


const App = () => {

  //Setting useState for tile values
  const [state, dispatch] = useReducer(AppReducer, defaultState)

  //handle keypress
  const handleKeyPressed = e => {

    if (state.gameOver || state.gameWon || state.isFirstGame) return;
    switch (e.key) {
      case "ArrowLeft": // LEFT
        dispatch({type: 'MOVE_LEFT'})
        break;
      case "ArrowUp": // UP
      dispatch({type: 'MOVE_UP'})
        break;
      case "ArrowRight": // RIGHT
      dispatch({type: 'MOVE_RIGHT'})
        break;
      case "ArrowDown": //Down
      dispatch({type: 'MOVE_DOWN'})
        break;
      default:
        break;
    }
  };

  // MARK: RENDER
  return (
    <React.Fragment>x
      <div
        className="wholeWindow"
        onKeyDown={handleKeyPressed}
        tabIndex={0}
      >
        <div className="container mt-5 text-center">
          {/* HEADER */}
          <Header reducer={{state: state, dispatch: dispatch}}/>
          {/* BOARD */}
          <Board 
            reducer={{state: state, dispatch: dispatch}} 
            numberOfRows={state.numberOfRows} 
            boardValues={state.boardValues}
          />
        </div>
      </div>
    </React.Fragment>
  );  
};



export default App;
