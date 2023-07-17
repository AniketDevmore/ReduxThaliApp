import { createSlice, current } from "@reduxjs/toolkit";

export const thaliSlice = createSlice({
  name: "thali",
  initialState: {
    iteams: [],
  },
  reducers: {
    AddToThali: (state, action) => {
      let presentData = state.iteams.find(
        (ele) => ele.id === action.payload.id
      );
      if (presentData) {
        presentData.qty++;
        [...state.iteams];
      } else {
        state.iteams.push(action.payload);
      }
    },
    ReduceIteamInThali: (state, action) => {
      let presentData = state.iteams.find(
        (ele) => ele.id === action.payload.id
      );
      if (presentData) {
        if (presentData.qty >= 2) {
          presentData.qty--;
          [...state.iteams];
          // debugger;
        } else {
          // debugger;
          state.iteams.map(function (ele, i) {
            if (ele.id === action.payload.id) {
              state.iteams.splice(i, 1);
            }
          });
          [...state.iteams];
        }
      }
    },
    RemoveIteamFromThali: (state, action) => {
      let newData = state.iteams.filter((ele) => ele.id !== action.payload.id);
      state.iteams = newData;
    },
  },
});

export const { AddToThali, ReduceIteamInThali, RemoveIteamFromThali } =
  thaliSlice.actions;
export default thaliSlice.reducer;
