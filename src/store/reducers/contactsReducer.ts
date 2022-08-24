import contactsAPI from "@/api/contactsAPI";
import { IContact } from "@/types/types";
import catchThunkError from "@/store/helpers/catchThunkError";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IState {
	contacts: IContact[];
	loading: boolean;
	error: string;
}

const initialState: IState = {
	contacts: [],
	loading: false,
	error: ""
};

export const getContacts = createAsyncThunk(
	"contacts/all",
	async (_, { rejectWithValue }) => {
		try {
			return await contactsAPI.getAll();
		} catch (error) {
			return catchThunkError(error, rejectWithValue);
		}
	}
);

export const createContact = createAsyncThunk(
	"contacts/create",
	async (contact: IContact, { rejectWithValue }) => {
		try {
			return await contactsAPI.create(contact);
		} catch (error) {
			return catchThunkError(error, rejectWithValue);
		}
	}
);

export const updateContact = createAsyncThunk(
	"contacts/update",
	async (contact: IContact, { rejectWithValue }) => {
		try {
			return await contactsAPI.update(contact);
		} catch (error) {
			return catchThunkError(error, rejectWithValue);
		}
	}
);

export const deleteContact = createAsyncThunk(
	"contacts/delete",
	async (contactId: IContact["id"], { rejectWithValue }) => {
		try {
			return await contactsAPI.remove(contactId);
		} catch (error) {
			return catchThunkError(error, rejectWithValue);
		}
	}
);

const onPending = (state: IState) => {
	state.loading = true;
	state.error = "";
};

const onRejected = (state: IState, action: PayloadAction<string>) => {
	state.contacts = [];
	state.loading = false;
	state.error = action.payload;
};

export const contactsSlice = createSlice({
	name: "contacts",
	initialState,
	reducers: {},
	extraReducers: {
		[getContacts.fulfilled.type]: (
			state,
			action: PayloadAction<IContact[]>
		) => {
			state.contacts = action.payload;
			state.loading = false;
			state.error = "";
		},
		[createContact.fulfilled.type]: (
			state,
			action: PayloadAction<IContact>
		) => {
			state.contacts.push(action.payload);
			state.loading = false;
			state.error = "";
		},
		[updateContact.fulfilled.type]: (
			state,
			action: PayloadAction<IContact>
		) => {
			let contactIndex = state.contacts.findIndex(
				(item) => item.id === action.payload.id
			);
			state.contacts.splice(contactIndex, 1, action.payload);
			state.loading = false;
			state.error = "";
		},
		[deleteContact.fulfilled.type]: (
			state,
			action: PayloadAction<IContact["id"]>
		) => {
			let contactIndex = state.contacts.findIndex(
				(item) => item.id === action.payload
			);
			state.contacts.splice(contactIndex, 1);
			state.loading = false;
			state.error = "";
		},
		[getContacts.pending.type]: onPending,
		[getContacts.rejected.type]: onRejected,
		[createContact.pending.type]: onPending,
		[createContact.rejected.type]: onRejected,
		[updateContact.pending.type]: onPending,
		[updateContact.rejected.type]: onRejected,
		[deleteContact.pending.type]: onPending,
		[deleteContact.rejected.type]: onRejected
	}
});

export default contactsSlice.reducer;
