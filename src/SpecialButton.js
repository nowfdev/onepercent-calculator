import { ACTIONS } from "./App";
export default function SpecialButton({ dispatch, operation }) {
  return (
    <button
      onClick={() => {
        dispatch({ type: ACTIONS.CHOOSE_SPECIAL_FUNC, payload: { operation } });
      }}
    >
      {operation}
    </button>
  );
}
