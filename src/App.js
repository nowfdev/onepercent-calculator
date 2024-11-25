import "./styles.css";
import { useReducer } from "react";
import DigitButton from "./DigitButton";
import OperationButton from "./OperationButton";

export const ACTIONS = {
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

  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-input">
          {previousInput} {operation}
        </div>
        <div className="current-input">{currentInput}</div>
      </div>

      <button>AC</button>
      <OperationButton operation="+/-" dispatch={dispatch}></OperationButton>
      <OperationButton operation="%" dispatch={dispatch}></OperationButton>
      <OperationButton operation="/" dispatch={dispatch}></OperationButton>
      <DigitButton digit="7" dispatch={dispatch}></DigitButton>
      <DigitButton digit="8" dispatch={dispatch}></DigitButton>
      <DigitButton digit="9" dispatch={dispatch}></DigitButton>
      <OperationButton operation="*" dispatch={dispatch}></OperationButton>
      <DigitButton digit="4" dispatch={dispatch}></DigitButton>
      <DigitButton digit="5" dispatch={dispatch}></DigitButton>
      <DigitButton digit="6" dispatch={dispatch}></DigitButton>
      <OperationButton operation="-" dispatch={dispatch}></OperationButton>
      <DigitButton digit="1" dispatch={dispatch}></DigitButton>
      <DigitButton digit="2" dispatch={dispatch}></DigitButton>
      <DigitButton digit="3" dispatch={dispatch}></DigitButton>
      <OperationButton operation="+" dispatch={dispatch}></OperationButton>
      <DigitButton digit="0" dispatch={dispatch}></DigitButton>
      <DigitButton digit="," dispatch={dispatch}></DigitButton>
      <button className="span-two">=</button>
    </div>
  );
}

export default App;
