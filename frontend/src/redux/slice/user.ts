import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Setting } from "../../entity/model/setting";
import { User } from "../../entity/model/user";

interface UserSliceState {
  master: User;
  setting: Setting;
}

const initialState: UserSliceState = {
  master: new User(),
  setting: new Setting(),
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setMaster(state, action: PayloadAction<User>): void {
      state.master = action.payload;
    },

    setSetting(state, action: PayloadAction<Setting>): void {
      state.setting = action.payload;
    },
  },
});

export const { setMaster, setSetting } = UserSlice.actions;
export const userReducer = UserSlice.reducer;
