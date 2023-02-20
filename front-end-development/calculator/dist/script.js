function calcReducer(state, { type, payload }) {
  switch (type) {
    case "DIGIT":
      if (state.overwrite) {
        return {
          ...state,
          currentValue: payload,
          overwrite: false };

      }

      if (payload === "0" &&
      state.currentValue === "0") return state;

      if (payload === "." &&
      state.currentValue == null) {
        return {
          ...state,
          currentValue: "0." };

      }

      if (payload === "." &&
      state.currentValue.includes(".")) return state;

      return {
        ...state,
        currentValue: `${state.currentValue || ""}${payload}` };


    case "OPERATION":
      if (payload === "-") {
        if (state.currentValue === "-") return state;
        if (state.currentValue == null) {
          return {
            ...state,
            currentValue: "-" };

        }
      }

      if (state.currentValue == null &&
      state.previousValue == null) return state;


      if (state.currentValue == null) {
        return {
          ...state,
          operator: payload };

      }

      if (state.currentValue === "-" && state.operator != null) {
        return {
          ...state,
          currentValue: null,
          operator: payload };

      }

      if (state.previousValue == null) {
        return {
          ...state,
          operator: payload,
          previousValue: state.currentValue,
          currentValue: null };

      }

      return {
        ...state,
        previousValue: evaluate(state),
        operator: payload,
        currentValue: null };


    case "ACTION":
      if (payload === "AC") return {};

      if (payload === "DEL") {
        if (state.overwrite) {
          return {
            ...state,
            overwrite: false,
            currentValue: null };

        }
        if (state.currentValue == null) return state;
        if (state.currentValue.length === 1) {
          return {
            ...state,
            currentValue: null };

        }
        return {
          ...state,
          currentValue: state.currentValue.slice(0, -1) };

      }

      if (payload === "=") {
        if (state.operator == null ||
        state.currentValue == null ||
        state.previousValue == null) return state;

        return {
          ...state,
          overwrite: true,
          previousValue: null,
          operator: null,
          currentValue: evaluate(state) };

      }

    default:
      return state;}

}

function evaluate({ currentValue, previousValue, operator }) {
  const prev = parseFloat(previousValue);
  const current = parseFloat(currentValue);
  if (isNaN(prev) || isNaN(current)) return "";
  let computation = "";
  switch (operator) {
    case "+":
      computation = prev + current;
      break;
    case "-":
      computation = prev - current;
      break;
    case "×":
      computation = prev * current;
      break;
    case "÷":
      computation = prev / current;
      break;}


  return computation.toString();
}

function formatValue(value) {
  const INTEGER_FORMATTER = new Intl.NumberFormat("en-us",
  { maximumFractionDigits: 0 });
  if (value === "-") return "-";
  if (value == null) return;
  const [integer, decimal] = value.split(".");
  if (decimal == null) return INTEGER_FORMATTER.format(integer);
  return `${INTEGER_FORMATTER.format(integer)}.${decimal.substr(0, 10)}`;
}

function App() {
  const [state, dispatch] = React.useReducer(calcReducer, {});

  return /*#__PURE__*/(
    React.createElement(React.Fragment, null, /*#__PURE__*/
    React.createElement("div", { id: "calculator" }, /*#__PURE__*/
    React.createElement("div", { id: "display" }, /*#__PURE__*/
    React.createElement("div", { id: "upper" }, formatValue(state.previousValue), " ", state.operator), /*#__PURE__*/
    React.createElement("div", { id: "lower" }, formatValue(state.currentValue) || "0")), /*#__PURE__*/

    React.createElement(CalcButton, { dispatch: dispatch, type: "ACTION", symbol: "AC" }), /*#__PURE__*/
    React.createElement(CalcButton, { dispatch: dispatch, type: "ACTION", symbol: "DEL" }), /*#__PURE__*/
    React.createElement(CalcButton, { dispatch: dispatch, type: "OPERATION", symbol: "\xF7" }), /*#__PURE__*/
    React.createElement(CalcButton, { dispatch: dispatch, type: "DIGIT", symbol: "7" }), /*#__PURE__*/
    React.createElement(CalcButton, { dispatch: dispatch, type: "DIGIT", symbol: "8" }), /*#__PURE__*/
    React.createElement(CalcButton, { dispatch: dispatch, type: "DIGIT", symbol: "9" }), /*#__PURE__*/
    React.createElement(CalcButton, { dispatch: dispatch, type: "OPERATION", symbol: "\xD7" }), /*#__PURE__*/
    React.createElement(CalcButton, { dispatch: dispatch, type: "DIGIT", symbol: "4" }), /*#__PURE__*/
    React.createElement(CalcButton, { dispatch: dispatch, type: "DIGIT", symbol: "5" }), /*#__PURE__*/
    React.createElement(CalcButton, { dispatch: dispatch, type: "DIGIT", symbol: "6" }), /*#__PURE__*/
    React.createElement(CalcButton, { dispatch: dispatch, type: "OPERATION", symbol: "-" }), /*#__PURE__*/
    React.createElement(CalcButton, { dispatch: dispatch, type: "DIGIT", symbol: "1" }), /*#__PURE__*/
    React.createElement(CalcButton, { dispatch: dispatch, type: "DIGIT", symbol: "2" }), /*#__PURE__*/
    React.createElement(CalcButton, { dispatch: dispatch, type: "DIGIT", symbol: "3" }), /*#__PURE__*/
    React.createElement(CalcButton, { dispatch: dispatch, type: "OPERATION", symbol: "+" }), /*#__PURE__*/
    React.createElement(CalcButton, { dispatch: dispatch, type: "DIGIT", symbol: "0" }), /*#__PURE__*/
    React.createElement(CalcButton, { dispatch: dispatch, type: "DIGIT", symbol: "." }), /*#__PURE__*/
    React.createElement(CalcButton, { dispatch: dispatch, type: "ACTION", symbol: "=" })), /*#__PURE__*/

    React.createElement("div", { id: "footer" }, "by ", /*#__PURE__*/
    React.createElement("a", { href: "https://github.com/nickpartalis", target: "_blank" }, "nickpartalis"))));



}

function CalcButton({ dispatch, type, symbol }) {
  const symbolToWords = { //necessary to pass tests...
    0: "zero", 1: "one", 2: "two", 3: "three", 4: "four", 5: "five",
    6: "six", 7: "seven", 8: "eight", 9: "nine", ".": "decimal",
    "+": "add", "-": "subtract", "×": "multiply", "÷": "divide",
    "=": "equals", "AC": "clear", "DEL": "delete" };

  return /*#__PURE__*/(
    React.createElement("button", {
      className: `${type.toLowerCase()}-btn${symbol == "=" || symbol == "AC" ? " span-2" : ""}`,
      onClick: () => dispatch({ type: type, payload: symbol }),
      id: symbolToWords[symbol] },

    symbol));


}

const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render( /*#__PURE__*/React.createElement(App, null));