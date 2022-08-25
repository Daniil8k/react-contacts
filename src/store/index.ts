import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import contactsReducer from "./reducers/contactsReducer";
import modalsReducer from "./reducers/modalsReducer";
import userReducer from "./reducers/userReducer";

export const store = configureStore({
	reducer: {
		user: userReducer,
		contacts: contactsReducer,
		modals: modalsReducer
	}
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
