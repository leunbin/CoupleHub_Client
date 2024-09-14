import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  name: "",
  phoneNum:"",
};

const userSlice = createSlice({
  name:'user',
  initialState,
  reducers:{
    setUser: (state, action) => {
      state.name = action.payload.name;
      state.phoneNum = action.payload.phoneNum;
    },

  }
})

export const {setUser} = userSlice.actions;
export default userSlice.reducer;