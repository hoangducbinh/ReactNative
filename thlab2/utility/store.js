import { createSlice, configureStore } from '@reduxjs/toolkit';

const contactsSlice = createSlice({
  name: 'contacts',
  // Initial state with contacts array, loading, and error flags
  initialState: {
    contacts: [],
    loading: false,
    error: false,
  },
  reducers: {
    fetchContactsLoading: (state) => {
      state.loading = true;
      state.error = false;
    },
    fetchContactsSuccess: (state, action) => {
      state.contacts = action.payload;
      state.loading = false;
      state.error = false;
    },
    fetchContactsError: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { fetchContactsLoading, fetchContactsSuccess, fetchContactsError } = contactsSlice.actions;

const store = configureStore({
  reducer: contactsSlice.reducer,
});

export default store;
