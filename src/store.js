import { configureStore, createSlice } from "@reduxjs/toolkit";

// Load state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem("selectedCurrency");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const persistedState = loadState();

const initialState = {
  selectedCurrency: persistedState || { base: null, target: null },
};

const currencySlice = createSlice({
  name: "selectedCurrency",
  initialState,
  reducers: {
    addBaseCurrency: (state, action) => {
      if (state.selectedCurrency.base !== null) {
        state.selectedCurrency.base = null;
        state.selectedCurrency.base = action.payload;
      } else {
        state.selectedCurrency.base = action.payload;
      }
    },
    addTargetCurrency: (state, action) => {
      if (state.selectedCurrency.target !== null) {
        state.selectedCurrency.target = null;
        state.selectedCurrency.target = action.payload;
      } else {
        state.selectedCurrency.target = action.payload;
      }
    },
  },
});

const store = configureStore({
  reducer: currencySlice.reducer,
});

store.subscribe(() => {
  try {
    const serializedState = JSON.stringify(store.getState().selectedCurrency);
    localStorage.setItem("selectedCurrency", serializedState);
  } catch {
    // ignore write errors
  }
});

const { addBaseCurrency, addTargetCurrency } = currencySlice.actions;

export { store, addBaseCurrency, addTargetCurrency };
