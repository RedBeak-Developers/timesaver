import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  websites: [],
};

const websiteSlice = createSlice({
  name: 'websites',
  initialState,
  reducers: {
    addWebsite(state, action) {
      state.websites.push(action.payload);
    },
    removeWebsite(state, action) {
      state.websites = state.websites.filter(
        (website) => website.url !== action.payload.url
      );
    },
    loadWebsites(state, action) {
      state.websites = action.payload;
    },
  },
});

export const { addWebsite, removeWebsite, loadWebsites } = websiteSlice.actions;
export default websiteSlice.reducer;
