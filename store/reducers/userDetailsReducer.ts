import { createSlice } from "@reduxjs/toolkit";
import { th } from "date-fns/locale";
interface UserDetailsState {
  status: 'loading' | 'idle';
  userDetails: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    img: string;
    mobile: string;
    relationship: string;
  } ;
}
const initialState: UserDetailsState = {
  status: 'idle',
  userDetails: {
    _id: '',
    firstName: '',
    lastName: '',
    email: '',
    img: '',
    mobile: '',
    relationship: '',
  },
};
const userDetailsSlice = createSlice({
  name: 'userDetails',
  initialState,
  reducers: {
    setUserDetails(state, action) {
     const {type, data} = action.payload;
     switch (type) {
      case 'USER_DETAILS':
      state.userDetails = data;
      break;
      default:
       throw new Error('Invalid action type');
     }
    },
  },
});
export const { setUserDetails } = userDetailsSlice.actions;
export default userDetailsSlice.reducer;