import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { persistor } from "../store";

interface DataProps {
  country: string;
  [prop: string]: string;
}

interface Token {
  code: number;
  password: string;
  type: string;
}

interface AccountState {
  id: "new" | "existing";
  data: DataProps;
  token: Token;
  isVerified: boolean;
  isLoggedIn: boolean;
  hasAccount: boolean;
}

const initialState: AccountState = {
  id: "new",
  data: {
    country: "",
  },
  token: {
    code: 0,
    password: "",
    type: "",
  },
  isVerified: false,
  isLoggedIn: false,
  hasAccount: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    saveCountry(state, action: PayloadAction<string>) {
      state.data.country = action.payload;
    },
    saveData(state, action: PayloadAction<DataProps>) {
      state.data = { ...state.data, ...action.payload };
    },
    resetData() {},
    validateToken(state, action: PayloadAction<Token>) {

    },
    saveToken(state, action: PayloadAction<Token>) {
      state.token = action.payload;
    },
    validateVoter(state, action: PayloadAction<boolean>) {
      state.isLoggedIn = action.payload;
    },
  },
});

export const {
  saveCountry,
  saveData,
  resetData,
  saveToken,
  validateToken,
  validateVoter,
} = accountSlice.actions;

export default accountSlice.reducer;
