import "./styles.css";
import { useReducer } from "react";
import DigitButton from "./DigitButton";
import OperationButton from "./OperationButton";
import SpecialButton from "./SpecialButton";

export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATION: "choose-operation",
  CHOOSE_SPECIAL_FUNC: "choose-special-function",
  CLEAR: "clear",
  DELETE: "delete-digit",
  EVALUATE: "evaluate",
};

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          currentInput: payload.digit,
          overwrite: false,
        };
      }
      if (payload.digit === "0" && state.currentInput === "0") return state;
      if (payload.digit === "," && state.currentInput.includes(","))
        return state;
      return {
        ...state,
        currentInput: `${state.currentInput || ""}${payload.digit}`,
      };
    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentInput == null && state.previousInput == null)
        return state;

      if (state.currentInput == null) {
        return {
          ...state,
          operation: payload.operation,
        };
      }

      if (state.currentInput != null && payload.operation === "+/-") {
        return {
          ...state,
          previousInput: evaluate(state),
        };
      }
      if (state.previousInput == null) {
        return {
          ...state,
          operation: payload.operation,
          previousInput: state.currentInput,
          currentInput: null,
        };
      }

      return {
        ...state,
        previousInput: evaluate(state),
        operation: payload.operation,
        currentInput: null,
      };
    case ACTIONS.CHOOSE_SPECIAL_FUNC:
      if (state.currentInput == null) return state;

      return {
        ...state,
        currentInput: evaluate(state),
      };
    case ACTIONS.EVALUATE:
      if (
        state.currentInput == null ||
        state.previousInput == null ||
        state.operation == null
      ) {
        return state;
      }
      return {
        ...state,
        previousInput: null,
        overwrite: true,
        operation: null,
        currentInput: evaluate(state),
      };
    case ACTIONS.CLEAR:
      return {};
    default:
      throw new Error("Invalid action");
  }
}

function evaluate({ currentInput, previousInput, operation }) {
  const prev = parseFloat(previousInput);
  const curr = parseFloat(currentInput);

  if (isNaN(prev) || isNaN(curr)) return "";

  let computation = "";
  switch (operation) {
    case "+":
      computation = prev + curr;
      break;
    case "-":
      computation = prev - curr;
      break;
    case "*":
      computation = prev * curr;
      break;
    case "/":
      computation = prev / curr;
      break;
    case "+/-":
      computation = -Math.abs(curr);

      break;
    default:
      throw new Error("Invalid action");
  }
  console.log(computation);
  return computation.toString();
}

function handlerSpecialCase({ currentInput, operation }) {
  const curr = currentInput;
  let rs = "";
  if (isNaN(curr)) return "";
  switch (operation) {
    case "+/-":
      if (curr < 0) {
        rs = Math.abs(curr);
      } else {
        rs = curr * -1;
      }
      break;
    default:
      throw new Error("SPECIAL FAIL");
  }
  return rs.toString();
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

      <button onClick={() => dispatch({ type: ACTIONS.CLEAR })}>AC</button>
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
      <button
        className="span-two"
        onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
      >
        =
      </button>
    </div>
  );
}

export default App;
