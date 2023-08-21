import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DataProps {
  [prop: string]: string;
}

interface Token {
  code: number;
  password: string;
  type: string;
}

interface AccountState {
  id: "new" | "existing",
  data: DataProps;
  token: Token;
  isLoggedIn: boolean;
  hasAccount: boolean;
}

const initialState: AccountState = {
  id: "new",
  data: {},
  token: {
    code: 0,
    password: "",
    type: "",
  },
  isLoggedIn: false,
  hasAccount: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    saveData(state, action: PayloadAction<DataProps>) {
      state.data = action.payload;
    },
    validateToken(state, action) {},
    saveToken(state, action: PayloadAction<Token>) {
      state.token = action.payload;
    },
    validateVoter(state, action: PayloadAction<boolean>) {
      state.isLoggedIn = action.payload;
    }
  },
});

export const { saveData, saveToken, validateToken, validateVoter } = accountSlice.actions;

export default accountSlice.reducer;
