import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DataProps {
  country: string;
  firstname: string;
  lastname: string;
  email: string;
  birthdate: string;
  street: string;
  city: string;
  state: string;
  gender: string;
  occupation: string;
  lgao: string;
  lgar: string;
  phone: string;
  hometown: string;
  regarea: string;
  pu: string;
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
    firstname: "",
    lastname: "",
    email: "",
    birthdate: "",
    street: "",
    city: "",
    state: "",
    gender: "",
    occupation: "",
    lgao: "",
    lgar: "",
    phone: "",
    hometown: "",
    regarea: "",
    pu: "",
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
      state.data = action.payload;
    },
    resetData() {},
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
  validateVoter,
} = accountSlice.actions;

export default accountSlice.reducer;
