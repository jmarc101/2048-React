import React, {useReducer} from "react";
import {defaultState, AppReducer} from './Components/AppReducer'
import "./App.css";
import Board from "./Components/Board";
import Header from './Components/Header'
import useKeypress from "react-use-keypress";






const App = () => {

  //handle keypress
  useKeypress(["ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown"], (e) => {
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
  });
    
  //Setting useState for tile values
  const [state, dispatch] = useReducer(AppReducer, defaultState)


  // MARK: RENDER
  return (
    <React.Fragment>
      <div className="container mt-5 text-center">
        {/* HEADER */}
        <Header reducer={{state: state, dispatch: dispatch}}/>
        {/* BOARD */}
        <Board numberOfRows={state.numberOfRows} boardValues={state.boardValues}/>
      </div>
    </React.Fragment>
  );  
};



export default App;
