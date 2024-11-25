import "./styles.css";
import { useReducer } from "react";

const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: "clear",
  DELETE: "delete-digit",
  EVALUATE: "evaluate",
};

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      return {
        ...state,
        currentInput: `${state.currentInput || ""}${payload.digit}`,
      };
    default:
  }
}
function App() {
  const [{ currentInput, previousInput, operation }, dispatch] = useReducer(
    reducer,
    {}
  );
  dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit: 1 } });
  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-input">
          {previousInput} {operation}
        </div>
        <div className="current-input">{currentInput}</div>
      </div>
      <button>AC</button>
      <button>+/-</button>
      <button>%</button>
      <button>/</button>
      <button>7</button>
      <button>8</button>
      <button>9</button>
      <button>X</button>
      <button>4</button>
      <button>5</button>
      <button>6</button>
      <button>-</button>
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button>+</button>
      <button className="span-two">0</button>
      <button>,</button>
      <button>=</button>
    </div>
  );
}

export default App;
