import { configureStore } from "@reduxjs/toolkit";

// Configure the store
export const store = configureStore({
  reducer: {}, // No reducers specified
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }), // Disable serializable check
});

// Optionally, you can subscribe to store changes and save state to local storage
// store.subscribe(() => {
//   saveState(store.getState());
// });
